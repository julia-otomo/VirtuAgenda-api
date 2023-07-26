import { Request, Response } from "express";
import { TToken, TUserLogin } from "../interfaces/user.interfaces";
import loginService from "../services/session/login.service";

const loginController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const requestBody: TUserLogin = request.body;

  const loginToken: TToken = await loginService(requestBody);

  return response.json(loginToken);
};

export default loginController;
