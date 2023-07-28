import { z } from "zod";

const userDetailsSchema = z.object({
  id: z.string(),
  email: z.string().email().max(150).nullish(),
  phone: z.string().max(12).nullish(),
  contactTitle: z.string().max(50).nullish(),
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
  .extend({
    email: z.string().max(150),
    phone: z.string().max(12),
  });

const userUpdateRequestSchema = userSchema.omit({
  id: true,
  addedAt: true,
  details: true,
});

const userDetailsUpdateRequestSchema = userDetailsSchema.omit({
  id: true,
  contactTitle: true,
});

const createUserDetailsRequestSchema = userDetailsSchema.omit({
  id: true,
});

const userResponseSchema = userSchema.omit({ password: true });

const userLoginSchema = z.object({
  email: z.string().max(80).nullish(),
  password: z.string().max(150),
});

const tokenSchema = z.object({
  token: z.string(),
  user: userSchema,
});

export {
  userSchema,
  userDetailsSchema,
  userRequestSchema,
  userResponseSchema,
  userLoginSchema,
  tokenSchema,
  userUpdateRequestSchema,
  createUserDetailsRequestSchema,
  userDetailsUpdateRequestSchema,
};
