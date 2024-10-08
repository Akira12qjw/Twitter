import { Collection, Db, MongoClient, ServerApiVersion } from "mongodb";
import { config } from "dotenv";
import User from "~/models/schemas/User.schema";
import RefreshToken from "~/models/schemas/RefreshToken.schema";
import Follower from "~/models/schemas/Follower.schema";
import VideoStatus from "~/models/schemas/VideoStatus.schema";
import Tweet from "~/models/schemas/Tweet.chema";
config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.jeyiaxq.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`;

class DatabaseService {
  private client: MongoClient;
  private db: Db;
  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(process.env.DB_NAME);
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async indexUser() {
    const exists = await this.users.indexExists([
      "email_1_password_1",
      "email_1",
      "username_1",
    ]);
    if (!exists) {
      this.users.createIndex({ email: 1, password: 1 });
      this.users.createIndex({ email: 1 }, { unique: true });
      this.users.createIndex({ username: 1 }, { unique: true });
    }
  }
  async indexRefreshToken() {
    const exists = await this.refresh_token.indexExists(["exp_1", "token_1"]);
    if (!exists) {
      this.refresh_token.createIndex({ token: 1 });
      this.refresh_token.createIndex({ exp: 1 }, { expireAfterSeconds: 0 });
    }
  }
  async indexVideoStatus() {
    const exists = await this.videoStatus.indexExists(["name_1"]);
    if (!exists) {
      this.videoStatus.createIndex({ token: 1 });
    }
  }
  async indexFollowers() {
    const exists = await this.followers.indexExists([
      "user_id_1_follower_user_id_1",
    ]);
    if (!exists) {
      this.followers.createIndex({ user_id: 1, follower_user_id: 1 });
    }
  }

  get tweets(): Collection<Tweet> {
    return this.db.collection(process.env.DB_TWEETS_COLLECTION as string);
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USER_COLLECTION as string);
  }

  get refresh_token(): Collection<RefreshToken> {
    return this.db.collection(
      process.env.DB_REFRESH_TOKEN_COLLECTION as string
    );
  }

  get followers(): Collection<Follower> {
    return this.db.collection(process.env.DB_FOLLOWERS_COLLECTION as string);
  }

  get videoStatus(): Collection<VideoStatus> {
    return this.db.collection(process.env.DB_VIDEO_STATUS_COLLECTION as string);
  }
}

//Tạo object từ class DabaseService
const databaseService = new DatabaseService();

export default databaseService;
