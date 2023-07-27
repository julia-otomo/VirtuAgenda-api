import { Repository } from "typeorm";
import { TContact } from "../../interfaces/contact.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";

const getUserContactService = async (
  userId: string,
  contactEmail: string
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

  const contact: TContact | undefined = user!.contacts.find(
    (contact) => contact.email.toLowerCase() == contactEmail.toLowerCase()
  );

  return contact!;
};

export default getUserContactService;
