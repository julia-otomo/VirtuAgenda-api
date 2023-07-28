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

userRouter.use(validateToken);

userRouter.get("/:id", verifyOwner, verifyId, getUserController);

userRouter.patch(
  "/:id",
  verifyOwner,
  validateRequestBody(userRequestSchema.partial()),
  verifyId,
  verifyEmailAndPhone,
  updateUserController
);

userRouter.delete("/:id", verifyOwner, verifyId, deleteUserController);

userRouter.post(
  "/:id/details",
  verifyOwner,
  validateRequestBody(createUserDetailsRequestSchema),
  verifyEmailAndPhone,
  createUserDetailsController
);

userRouter.patch(
  "/:id/details/:contactTitle",
  verifyOwner,
  validateRequestBody(userDetailsUpdateRequestSchema),
  verifyContactTitle,
  verifyEmailAndPhone,
  updateUserDetailsController
);

userRouter.delete(
  "/:id/details/:contactTitle",
  verifyOwner,
  verifyContactTitle,
  deleteUserDetailsController
);

export default userRouter;
