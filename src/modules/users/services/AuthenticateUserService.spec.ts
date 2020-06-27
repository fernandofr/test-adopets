import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fake/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  const userTest = {
    name: 'userTest',
    email: 'userTest@gmail.com.br',
    password: '123456',
  };

  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute(userTest);

    const response = await authenticateUser.execute(userTest);

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(authenticateUser.execute(userTest)).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute(userTest);

    expect(
      authenticateUser.execute({
        email: 'userTest@gmail.com.br',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
