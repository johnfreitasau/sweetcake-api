import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/infra/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    const response = await authenticateUser.execute({
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate using an non existing account.', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('It should not be able to authenticate using the wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    await expect(
      authenticateUser.execute({
        email: 'john.doe@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
