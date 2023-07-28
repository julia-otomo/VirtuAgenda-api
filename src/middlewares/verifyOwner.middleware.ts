import { Request, Response, NextFunction } from "express";
import AppError from "../error";

const verifyOwner = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const responseUserId: string = response.locals.user.id;
  const requestUserId: string = request.params.id;

  if (responseUserId != requestUserId) {
    throw new AppError("Insufficient permission", 403);
  }

  next();
};

export default verifyOwner;
