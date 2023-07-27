import { Repository } from "typeorm";
import { TUser, TUserResponse } from "../../interfaces/user.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { userResponseSchema } from "../../schemas/user.schemas";

const getUserService = async (id: string): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: TUser | null = await userRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      details: true,
    },
  });

  const validatedUser: TUserResponse = userResponseSchema.parse(user!);

  return validatedUser;
};

export default getUserService;
