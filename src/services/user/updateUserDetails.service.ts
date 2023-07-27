import { Repository } from "typeorm";
import {
  TUpdateUserDetails,
  TUser,
  TUserResponse,
} from "../../interfaces/user.interfaces";
import { User, UserDetails } from "../../entities";
import { AppDataSource } from "../../data-source";
import { userResponseSchema } from "../../schemas/user.schemas";

const updateUserDetailsService = async (
  contactTitle: string,
  userId: string,
  data: TUpdateUserDetails
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const userDetailsRepository: Repository<UserDetails> =
    AppDataSource.getRepository(UserDetails);

  const user: TUser | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  let userDetails: UserDetails | null = await userDetailsRepository.findOne({
    where: {
      contactTitle: contactTitle,
      user: {
        id: user!.id,
      },
    },
  });

  userDetails = {
    ...userDetails!,
    ...data,
  };

  await userDetailsRepository.save(userDetails!);

  const validatedUser: TUserResponse = userResponseSchema.parse(user!);

  return validatedUser;
};

export default updateUserDetailsService;
