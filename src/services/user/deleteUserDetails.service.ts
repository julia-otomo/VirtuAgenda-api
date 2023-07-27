import { Repository } from "typeorm";
import { TUser } from "../../interfaces/user.interfaces";
import { User, UserDetails } from "../../entities";
import { AppDataSource } from "../../data-source";

const deleteUserDetailsService = async (
  contactTitle: string,
  userId: string
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const userDetailsRepository: Repository<UserDetails> =
    AppDataSource.getRepository(UserDetails);

  const user: TUser | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const userDetails: UserDetails | null = await userDetailsRepository.findOne({
    where: {
      contactTitle: contactTitle,
      user: {
        id: user!.id,
      },
    },
  });

  await userDetailsRepository.remove(userDetails!);
};

export default deleteUserDetailsService;
