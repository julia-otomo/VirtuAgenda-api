import { Repository } from "typeorm";
import { Contact, User } from "../../entities";
import { AppDataSource } from "../../data-source";

const deleteUserContactService = async (
  contactEmail: string,
  userId: string
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      contacts: true,
    },
  });

  const contactFound: Contact | undefined = user!.contacts.find(
    (contact) => contact.email.toLowerCase() == contactEmail.toLowerCase()
  );

  const removeContact: Contact[] | [] = user!.contacts.filter(
    (contact) => contact != contactFound
  );

  user!.contacts = removeContact;

  await userRepository.save(user!);
};

export default deleteUserContactService;
