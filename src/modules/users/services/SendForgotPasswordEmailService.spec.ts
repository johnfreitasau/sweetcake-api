import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/infra/errors/AppError';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;
let fakeUserTokensRepository: FakeUserTokensRepository;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('Should be able to recover the password via email.', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'john.doe@gmail.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('It should not be able to recover a non-existing user password.', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'john.doe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a forgotten password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'john.doe@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
