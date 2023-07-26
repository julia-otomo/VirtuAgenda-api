import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { UserDetails } from "../entities";
import { AppDataSource } from "../data-source";
import AppError from "../error";

const verifyEmailAndPhone = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userEmail: string = request.body.email;
  const userPhone: string = request.body.phone;
  const userDetailRepo: Repository<UserDetails> =
    AppDataSource.getRepository(UserDetails);

  if (userEmail) {
    const findEmail: boolean = await userDetailRepo.exist({
      where: {
        email: userEmail,
      },
    });

    if (findEmail) {
      throw new AppError("Email already exists", 409);
    }
  }

  if (userPhone) {
    const findPhone: boolean = await userDetailRepo.exist({
      where: {
        phone: userPhone,
      },
    });

    if (findPhone) {
      throw new AppError("Phone already exists", 409);
    }
  }

  next();
};

export default verifyEmailAndPhone;
