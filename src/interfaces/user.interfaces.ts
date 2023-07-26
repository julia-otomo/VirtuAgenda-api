import { z } from "zod";
import {
  tokenSchema,
  userLoginSchema,
  userRequestSchema,
  userResponseSchema,
  userSchema,
} from "../schemas/user.schemas";

type TUser = z.infer<typeof userSchema>;

type TUserRequest = z.infer<typeof userRequestSchema>;

type TUserResponse = z.infer<typeof userResponseSchema>;

type TUserLogin = z.infer<typeof userLoginSchema>;

type TToken = z.infer<typeof tokenSchema>;

export { TUser, TUserRequest, TUserResponse, TUserLogin, TToken };
