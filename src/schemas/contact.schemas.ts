import { z } from "zod";

const contactSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
  image: z.string().nullish(),
  email: z.string().max(80).email(),
  phone: z.string().max(12),
  addedAt: z.string(),
});

const contactRequestSchema = contactSchema.omit({ id: true, addedAt: true });

export { contactSchema, contactRequestSchema };
