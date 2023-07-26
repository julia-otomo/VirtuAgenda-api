import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User, UserDetails } from "../entities";
import { AppDataSource } from "../data-source";
import AppError from "../error";
import { compareSync } from "bcryptjs";

const validateUserLogin = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userEmail: string = request.body.email;
  const userPassword: string = request.body.password;

  const userDetailsRepository: Repository<UserDetails> =
    AppDataSource.getRepository(UserDetails);

  const findUserDetails: UserDetails | null =
    await userDetailsRepository.findOne({
      where: {
        email: userEmail,
      },
      relations: {
        user: true,
      },
    });

  if (!findUserDetails) {
    throw new AppError("Invalid credentials", 401);
  }

  const user: User = findUserDetails.user;

  const validPassword: boolean = compareSync(userPassword, user.password);

  if (!validPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  return next();
};

export default validateUserLogin;
