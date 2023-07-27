import { NextFunction, Request, Response, response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";

import AppError from "../error";
import { TContact } from "../interfaces/contact.interfaces";

const verifyContactEmail = async (
  request: Request,
  reponse: Response,
  next: NextFunction
): Promise<void> => {
  const contactEmail: string = request.params.email;
  const userId: string = response.locals.user.id;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      contacts: true,
    },
  });

  const contact: TContact | undefined = user!.contacts.find(
    (contact) => contact.email.toLowerCase() == contactEmail.toLowerCase()
  );

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  return next();
};

export default verifyContactEmail;
