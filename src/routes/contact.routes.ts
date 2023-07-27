import { Router } from "express";
import validateToken from "../middlewares/validateToken.middleware";
import {
  createContactController,
  deleteUserContactController,
  getAllContactsControllers,
  getUserContactController,
  updateUserContactController,
} from "../controllers/contact.controller";
import validateRequestBody from "../middlewares/validateBody.middleware";
import { contactRequestSchema } from "../schemas/contact.schemas";
import verifyContactEmail from "../middlewares/verifyContactId.middleware";
import verifyEmailAndPhoneContact from "../middlewares/verifyEmailAndPhoneContact.middleware";
import verifyOwner from "../middlewares/verifyOwner.middleware";

const contactRouter: Router = Router();

contactRouter.use(validateToken, verifyOwner);

contactRouter.post(
  "/:id",
  validateRequestBody(contactRequestSchema),
  createContactController
);

contactRouter.get("/:id", getAllContactsControllers);

contactRouter.use(verifyContactEmail);

contactRouter.get("/:id/:email", getUserContactController);

contactRouter.patch(
  "/:id/:email",
  verifyEmailAndPhoneContact,
  updateUserContactController
);

contactRouter.delete("/:id/:email", deleteUserContactController);

export default contactRouter;
