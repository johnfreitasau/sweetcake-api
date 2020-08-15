import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import AppError from '@shared/infra/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let resetPasswordService: ResetPasswordService;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to reset the password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({ token, password: '112233' });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('112233');
    expect(updatedUser?.password).toBe('112233');
  });

  it('Should not be able to reset the password for a unknown token.', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'token-12345678',
        password: '112233',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password for a unknown user.', async () => {
    const { token } = await fakeUserTokensRepository.generate('unknown-user');

    await expect(
      resetPasswordService.execute({ token, password: '112233' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password after 2 hours.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    // const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await expect(
      resetPasswordService.execute({ token, password: '112233' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
