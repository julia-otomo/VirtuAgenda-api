import { Repository } from "typeorm";
import { TUserRequest, TUserResponse } from "../../interfaces/user.interfaces";
import { User, UserDetails } from "../../entities";
import { AppDataSource } from "../../data-source";
import { userResponseSchema } from "../../schemas/user.schemas";

const createUserService = async (
  requestBody: TUserRequest
): Promise<TUserResponse> => {
  const { email, phone, ...rest } = requestBody;

  const userDetailsRepository: Repository<UserDetails> =
    AppDataSource.getRepository(UserDetails);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userDetails: UserDetails = userDetailsRepository.create({
    email: email,
    phone: phone,
  });

  await userDetailsRepository.save(userDetails);

  const user: User = userRepository.create({
    ...rest,
    details: [userDetails],
  });

  await userRepository.save(user);

  const validateResponse: TUserResponse = userResponseSchema.parse(user);

  return validateResponse;
};

export default createUserService;
