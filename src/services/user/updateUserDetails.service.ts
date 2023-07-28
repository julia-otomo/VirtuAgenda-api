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
    relations: {
      details: true,
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

  const updatedUser: TUser = {
    ...user!,
    details: user!.details.map((detail) =>
      detail.id === userDetails!.id ? userDetails! : detail
    ),
  };

  const validatedUser: TUserResponse = userResponseSchema.parse(updatedUser);

  return validatedUser;
};

export default updateUserDetailsService;
