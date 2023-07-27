import { Request, Response } from "express";
import {
  TCreateUserDetails,
  TUpdateUserDetails,
  TUserRequest,
  TUserResponse,
} from "../interfaces/user.interfaces";
import createUserService from "../services/user/createUser.service";
import updateUserService from "../services/user/updateUser.service";
import getUserService from "../services/user/getUser.service";
import deleteUserService from "../services/user/deleteUser.service";
import createUserDetailsService from "../services/user/createUserDetails.service";
import updateUserDetailsService from "../services/user/updateUserDetails.service";
import deleteUserDetailsService from "../services/user/deleteUserDetails.service";

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const requestBody: TUserRequest = request.body;

  const newUser: TUserResponse = await createUserService(requestBody);

  return response.status(201).json(newUser);
};

const updateUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: string = request.params.id;
  const data: TUserRequest = request.body;

  const userUpdated: TUserResponse = await updateUserService(userId, data);

  return response.json(userUpdated);
};

const getUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: string = request.params.id;

  const user: TUserResponse = await getUserService(userId);

  return response.json(user);
};

const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: string = request.params.id;

  await deleteUserService(userId);

  return response.status(204);
};

const createUserDetailsController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: string = response.locals.user.id;
  const data: TCreateUserDetails = request.body;

  const newDetails: TUserResponse = await createUserDetailsService(
    data,
    userId
  );

  return response.status(201).json(newDetails);
};

const updateUserDetailsController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: string = response.locals.user.id;
  const contactTitle: string = request.params.contactTitle;
  const data: TUpdateUserDetails = request.body;

  const user: TUserResponse = await updateUserDetailsService(
    contactTitle,
    userId,
    data
  );

  return response.json(user);
};

const deleteUserDetailsController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: string = response.locals.user.id;
  const contactTitle: string = request.params.contactTitle;

  await deleteUserDetailsService(contactTitle, userId);

  return response.status(204);
};

export {
  createUserController,
  updateUserController,
  getUserController,
  deleteUserController,
  createUserDetailsController,
  updateUserDetailsController,
  deleteUserDetailsController,
};
