import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { TUser } from "../interfaces/user.interfaces";
import AppError from "../error";

const verifyId = async (
  request: Request,
  reponse: Response,
  next: NextFunction
): Promise<void> => {
  const userId: string = request.params.id;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: TUser | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default verifyId;
