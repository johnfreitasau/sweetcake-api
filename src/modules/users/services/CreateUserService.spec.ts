import AppError from '@shared/infra/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('Should be able to create a user.', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create the same user twice.', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
