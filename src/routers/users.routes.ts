import { Router } from "express";
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
} from "../middlewares/users.middlewares";
import {
  emailVerifyController,
  loginController,
  logoutController,
  registerController,
} from "~/controllers/user.controller";
import { wrapRequestHandler } from "~/utils/handlers";
import { validate } from "~/utils/validation";
const usersRouter = Router();

usersRouter.post("/login", loginValidator, wrapRequestHandler(loginController));
usersRouter.post(
  "/register",
  registerValidator,
  wrapRequestHandler(registerController)
);

usersRouter.post(
  "/logout",
  accessTokenValidator,
  refreshTokenValidator,
  wrapRequestHandler(logoutController)
);

usersRouter.post(
  "/verify-email",
  emailVerifyTokenValidator,
  wrapRequestHandler(emailVerifyController)
);

export default usersRouter;
