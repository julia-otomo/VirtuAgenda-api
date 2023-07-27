import { Request, Response, NextFunction } from "express";
import AppError from "../error";

const verifyOwner = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const reponseUserId: string = response.locals.user.id;
  const requestUserId: string = request.params.id;

  if (reponseUserId !== requestUserId) {
    throw new AppError("Insufficient permission", 403);
  }

  next();
};

export default verifyOwner;
