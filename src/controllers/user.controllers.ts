import { Request, Response } from "express";
import { TUserRequest, TUserResponse } from "../interfaces/user.interfaces";
import createUserService from "../services/user/createUser.service";

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const requestBody: TUserRequest = request.body;

  const newUser: TUserResponse = await createUserService(requestBody);

  return response.status(201).json(newUser);
};

export { createUserController };
