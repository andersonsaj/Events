import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import auth from '../config/auth';
import User from '../entities/User';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  userSession: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const userSession = await usersRepository.findOne({ where: { email } });

    if (!userSession) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, userSession.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: userSession.id,
      expiresIn,
    });

    return {
      userSession,
      token,
    };
  }
}

export default AuthenticateUserService;
