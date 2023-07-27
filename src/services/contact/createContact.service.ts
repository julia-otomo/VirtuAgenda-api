import { Repository } from "typeorm";
import { TContact, TContactRequest } from "../../interfaces/contact.interfaces";
import { Contact, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import AppError from "../../error";

const createContactService = async (
  userId: string,
  data: TContactRequest
): Promise<TContact> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      contacts: true,
    },
  });

  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  let newContact: Contact | null;

  newContact = await contactRepository.findOne({
    where: {
      email: data.email,
    },
    relations: {
      users: true,
    },
  });

  if (newContact) {
    const contactFound: TContact | undefined = user!.contacts.find(
      (contact) => contact.email == newContact!.email
    );

    if (contactFound) {
      throw new AppError(
        "This contact was already added in your contacts list",
        409
      );
    }

    newContact!.users.push(user!);

    await contactRepository.save(newContact);
  } else {
    newContact = contactRepository.create({
      ...data,
      users: [user!],
    });

    await contactRepository.save(newContact);
  }

  return newContact;
};

export default createContactService;
