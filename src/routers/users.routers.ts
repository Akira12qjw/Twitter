import { Router } from "express";
import { loginValidator } from "../middlewares/users.middlewares";
import { loginController } from "~/controllers/user.controller";
const usersRouter = Router();

usersRouter.post("/login", loginValidator, loginController);

export default usersRouter;
