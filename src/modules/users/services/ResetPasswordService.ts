import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import AppError from '@shared/infra/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private userHashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exist');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const tokenCreatedAt = userToken.created_at;

    // console.log(Date.now());
    // console.log(new Date(Date.now()));
    // console.log(tokenCreatedAt);
    // console.log(differenceInHours(Date.now(), tokenCreatedAt));
    // console.log(differenceInHours(Date.now(), tokenCreatedAt) > 2);

    // if (differenceInHours(new Date(Date.now()), tokenCreatedAt) > 2) {
    //   throw new AppError('Token expired');
    // }

    if (differenceInHours(new Date(), tokenCreatedAt) > 2) {
      throw new AppError('Token expired');
    }

    user.password = await this.userHashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
