import { z } from "zod";
import {
  contactRequestSchema,
  contactSchema,
} from "../schemas/contact.schemas";

type TContact = z.infer<typeof contactSchema>;

type TContactRequest = z.infer<typeof contactRequestSchema>;

export { TContact, TContactRequest };
