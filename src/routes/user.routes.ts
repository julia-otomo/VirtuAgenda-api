import { Router } from "express";
import validateRequestBody from "../middlewares/validateBody.middleware";
import {
  createUserDetailsRequestSchema,
  userDetailsUpdateRequestSchema,
  userRequestSchema,
} from "../schemas/user.schemas";
import verifyEmailAndPhone from "../middlewares/verifyEmailAndPhone.middleware";
import {
  createUserController,
  createUserDetailsController,
  deleteUserController,
  deleteUserDetailsController,
  getUserController,
  updateUserController,
  updateUserDetailsController,
} from "../controllers/user.controllers";
import validateToken from "../middlewares/validateToken.middleware";
import verifyOwner from "../middlewares/verifyOwner.middleware";
import verifyId from "../middlewares/verifyId.middleware";
import verifyContactTitle from "../middlewares/verifyContactTitle.middleware";

const userRouter: Router = Router();

userRouter.post(
  "",
  validateRequestBody(userRequestSchema),
  verifyEmailAndPhone,
  createUserController
);

userRouter.use(validateToken, verifyOwner);

userRouter.get("/:id", verifyId, getUserController);

userRouter.patch(
  "/:id",
  validateRequestBody(userRequestSchema.partial()),
  verifyId,
  verifyEmailAndPhone,
  updateUserController
);

userRouter.delete("/:id", verifyId, deleteUserController);

userRouter.post(
  "/:id/details",
  validateRequestBody(createUserDetailsRequestSchema),
  verifyEmailAndPhone,
  createUserDetailsController
);

userRouter.patch(
  "/:id/details/:contactTitle",
  validateRequestBody(userDetailsUpdateRequestSchema),
  verifyContactTitle,
  verifyEmailAndPhone,
  updateUserDetailsController
);

userRouter.delete(
  "/:id/details/:contactTitle",
  verifyContactTitle,
  deleteUserDetailsController
);

export default userRouter;
