import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Contact } from "../entities";
import { AppDataSource } from "../data-source";

const verifyContact = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const name = request.body.name;
  const email = request.body.email;
  const phone = request.body.phone;

  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact: Contact | null = await contactRepository
    .createQueryBuilder("contacts")
    .where("contact.name = :name", { name: name })
    .leftJoinAndSelect("contacts.details", "userDetails")
    .andWhere("userDetails.email = :email", {
      email: email,
    })
    .andWhere("userDetails.phone = :phone", { phone: phone })
    .getOne();

  if (contact) {
    response.locals.contact = contact;
  }

  return next();
};

export default verifyContact;
