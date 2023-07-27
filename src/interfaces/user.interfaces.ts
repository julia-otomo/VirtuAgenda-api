import { z } from "zod";
import {
  createUserDetailsRequestSchema,
  tokenSchema,
  userDetailsUpdateRequestSchema,
  userLoginSchema,
  userRequestSchema,
  userResponseSchema,
  userSchema,
  userUpdateRequestSchema,
} from "../schemas/user.schemas";

type TUser = z.infer<typeof userSchema>;

type TUserRequest = z.infer<typeof userRequestSchema>;

type TUserResponse = z.infer<typeof userResponseSchema>;

type TUserLogin = z.infer<typeof userLoginSchema>;

type TToken = z.infer<typeof tokenSchema>;

type TUserUpdateRequest = z.infer<typeof userUpdateRequestSchema>;

type TCreateUserDetails = z.infer<typeof createUserDetailsRequestSchema>;

type TUpdateUserDetails = z.infer<typeof userDetailsUpdateRequestSchema>;

export {
  TUser,
  TUserRequest,
  TUserResponse,
  TUserLogin,
  TToken,
  TUserUpdateRequest,
  TCreateUserDetails,
  TUpdateUserDetails,
};
