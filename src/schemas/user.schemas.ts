import { z } from "zod";

const userDetailsSchema = z.object({
  id: z.string(),
  email: z.string().email().max(150),
  phone: z.string().max(12),
});

const userSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
  password: z.string().max(150),
  image: z.string().nullish(),
  details: z.array(userDetailsSchema),
  addedAt: z.string(),
});

const userRequestSchema = userSchema
  .omit({ id: true, addedAt: true, details: true })
  .extend({ email: z.string().max(150), phone: z.string().max(12) });

const userResponseSchema = userSchema.omit({ password: true });

const userLoginSchema = z.object({
  email: z.string().max(80),
  password: z.string().max(150),
});

const tokenSchema = z.object({
  token: z.string(),
});

export {
  userSchema,
  userRequestSchema,
  userResponseSchema,
  userLoginSchema,
  tokenSchema,
};
