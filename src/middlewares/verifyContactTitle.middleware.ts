import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User, UserDetails } from "../entities";
import { AppDataSource } from "../data-source";
import AppError from "../error";

const verifyContactTitle = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userId: string = response.locals.user.id;
  const contactTitle: string = request.params.contactTitle;
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      details: true,
    },
  });

  const findDetails: UserDetails | undefined = user!.details.find(
    (contact) =>
      contact.contactTitle?.toLowerCase() == contactTitle.toLowerCase()
  );

  if (!findDetails) {
    throw new AppError("User information not found", 404);
  }

  return next();
};

export default verifyContactTitle;
