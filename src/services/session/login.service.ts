import { Repository } from "typeorm";
import { TToken, TUserLogin } from "../../interfaces/user.interfaces";
import { User, UserDetails } from "../../entities";
import { AppDataSource } from "../../data-source";
import { sign } from "jsonwebtoken";
import "dotenv/config";

const loginService = async (requestBody: TUserLogin): Promise<TToken> => {
  const email: string | undefined | null = requestBody.email;

  const userDetailsRepository: Repository<UserDetails> =
    AppDataSource.getRepository(UserDetails);

  const findUser: UserDetails | null = await userDetailsRepository.findOne({
    where: { email: email! },
    relations: {
      user: true,
    },
  });

  const user: User = findUser!.user;

  const token: string = sign(
    { email: findUser!.email },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: user.id,
    }
  );

  const responseUser = {
    token: token,
    user: findUser!.user,
  };

  return responseUser;
};

export default loginService;
