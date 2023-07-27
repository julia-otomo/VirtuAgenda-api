import { Repository } from "typeorm";
import { TContact } from "../../interfaces/contact.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";

const getAllContactsService = async (userId: string): Promise<TContact[]> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      contacts: true,
    },
  });

  return user!.contacts;
};

export default getAllContactsService;
