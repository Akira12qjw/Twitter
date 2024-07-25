import User from "~/models/schemas/User.schema";
import databaseService from "./database.services";
import { signToken } from "~/utils/jwt";
import { TokenType, UserVerifyStatus } from "~/constants/enums";
import { envConfig } from "~/constants/config";
import { hashPassword } from "~/utils/crypto";
import RefreshToken from "~/models/schemas/RefreshToken.schema";
import { ObjectId } from "mongodb";
import { RegisterReqBody } from "~/models/requests/User.requests";
import { config } from "dotenv";
import { USERS_MESSAGES } from "~/constants/messages";
config();
class UsersService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
      },
      privateKey: envConfig.jwtSecretAccessToken,
      options: {
        expiresIn: envConfig.accessTokenExpiresIn,
      },
    });
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
      },
      privateKey: envConfig.jwtSecretRefreshToken,
    });
  }

  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id),
    ]);
  }

  async register(payload: RegisterReqBody) {
    // const { email, password } = payload;
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password),
      })
    );
    const user_id = result.insertedId.toString();
    const [access_token, refresh_token] =
      await this.signAccessAndRefreshToken(user_id);
    await databaseService.refresh_token.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token })
    );
    return {
      access_token,
      refresh_token,
    };
  }

  async checkEmailExists(email: string) {
    const user = await databaseService.users.findOne({ email });
    return Boolean(user);
  }

  async login(user_id: string) {
    const [access_token, refresh_token] =
      await this.signAccessAndRefreshToken(user_id);
    await databaseService.refresh_token.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token })
    );
    return {
      access_token,
      refresh_token,
    };
  }
  async logout(refresh_token: string) {
    await databaseService.refresh_token.deleteOne({ token: refresh_token });
    return {
      message: USERS_MESSAGES.LOGOUT_SUCCESS,
    };
  }
}
const usersService = new UsersService();
export default usersService;
