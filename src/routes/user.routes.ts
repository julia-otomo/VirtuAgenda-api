import { Router } from "express";
import validateRequestBody from "../middlewares/validateBody.middleware";
import { userRequestSchema } from "../schemas/user.schemas";
import verifyEmailAndPhone from "../middlewares/verifyEmailAndPhone.middleware";
import { createUserController } from "../controllers/user.controllers";

const userRouter: Router = Router();

userRouter.post(
  "",
  validateRequestBody(userRequestSchema),
  verifyEmailAndPhone,
  createUserController
);

userRouter.get("/:id");

userRouter.patch("/:id");

userRouter.delete("/:id");

export default userRouter;
