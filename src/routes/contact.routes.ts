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

const contactRouter: Router = Router();

contactRouter.use(validateToken);

contactRouter.post(
  "",
  validateRequestBody(contactRequestSchema),
  createContactController
);

contactRouter.get("", getAllContactsControllers);

contactRouter.use(verifyContactEmail);

contactRouter.get("/:email", getUserContactController);

contactRouter.patch(
  "/:email",
  verifyEmailAndPhoneContact,
  updateUserContactController
);

contactRouter.delete("/:email", deleteUserContactController);

export default contactRouter;
