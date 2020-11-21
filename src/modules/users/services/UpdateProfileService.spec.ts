import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import AppError from '@shared/infra/errors/AppError';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Fre',
      email: 'john.fre@gmail.com',
      // oldPassword: user.password,
      // password: user.password,
    });

    expect(updatedUser?.name).toBe('John Fre');
    expect(updatedUser?.email).toBe('john.fre@gmail.com');
  });

  it('should not be able to update email to one already in use', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Fre',
      email: 'john.fre@gmail.com',
      password: '12345',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Fre',
        email: 'john.doe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Fre',
      email: 'john.fre@gmail.com',
      oldPassword: '12345',
      password: '123123',
    });

    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to update the profile without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Fre',
        email: 'john.fre@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile with the old password wrong', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Fre',
        email: 'john.fre@gmail.com',
        oldPassword: '123459',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile is user is not found', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'unknown user',
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        oldPassword: '1111',
        password: '1111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
