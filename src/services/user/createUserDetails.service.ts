import { Repository } from "typeorm";
import {
  TCreateUserDetails,
  TUser,
  TUserResponse,
} from "../../interfaces/user.interfaces";
import { User, UserDetails } from "../../entities";
import { AppDataSource } from "../../data-source";
import { userResponseSchema } from "../../schemas/user.schemas";

const createUserDetailsService = async (
  data: TCreateUserDetails,
  userId: string
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

  const newDetails: UserDetails = userDetailsRepository.create({
    ...data,
  });

  await userDetailsRepository.save(newDetails);

  user!.details.push(newDetails);

  await userRepository.save(user!);

  const validatedUser: TUserResponse = userResponseSchema.parse(user!);

  return validatedUser;
};

export default createUserDetailsService;
