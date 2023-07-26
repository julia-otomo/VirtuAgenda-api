import { Router } from "express";
import validateUserLogin from "../middlewares/validateUserLogin.middleware";
import loginController from "../controllers/session.controller";
import validateRequestBody from "../middlewares/validateBody.middleware";
import { userLoginSchema } from "../schemas/user.schemas";

const sessionRouter: Router = Router();

sessionRouter.post(
  "",
  validateRequestBody(userLoginSchema),
  validateUserLogin,
  loginController
);

export default sessionRouter;
