import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Contact } from "../entities";
import { AppDataSource } from "../data-source";
import AppError from "../error";

const verifyEmailAndPhoneContact = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const contactEmail: string = request.body.email;
  const contactPhone: string = request.body.phone;
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  if (contactEmail) {
    const findEmail: boolean = await contactRepository.exist({
      where: {
        email: contactEmail,
      },
    });

    if (findEmail) {
      throw new AppError("Email already exists", 409);
    }
  }

  if (contactPhone) {
    const findPhone: boolean = await contactRepository.exist({
      where: {
        phone: contactPhone,
      },
    });

    if (findPhone) {
      throw new AppError("Phone already exists", 409);
    }
  }

  next();
};

export default verifyEmailAndPhoneContact;
