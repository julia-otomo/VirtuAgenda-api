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

contactRouter.use(validateToken);

contactRouter.post(
  "/:id",
  verifyOwner,
  validateRequestBody(contactRequestSchema),
  createContactController
);

contactRouter.get("/:id", verifyOwner, getAllContactsControllers);

contactRouter.get(
  "/:id/:email",
  verifyOwner,
  verifyContactEmail,
  getUserContactController
);

contactRouter.patch(
  "/:id/:email",
  verifyOwner,
  verifyContactEmail,
  verifyEmailAndPhoneContact,
  updateUserContactController
);

contactRouter.delete(
  "/:id/:email",
  verifyOwner,
  verifyContactEmail,
  deleteUserContactController
);

export default contactRouter;
