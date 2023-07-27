import { Repository } from "typeorm";
import {
  TUser,
  TUserResponse,
  TUserUpdateRequest,
} from "../../interfaces/user.interfaces";
import { User, UserDetails } from "../../entities";
import { AppDataSource } from "../../data-source";
import { userResponseSchema } from "../../schemas/user.schemas";

const updateUserService = async (
  id: string,
  data: TUserUpdateRequest
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  let user: TUser | null = await userRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      details: true,
    },
  });

  user = {
    ...user!,
    ...data,
  };

  await userRepository.save(user!);

  const validateUser: TUserResponse = userResponseSchema.parse(user!);

  return validateUser;
};

export default updateUserService;
