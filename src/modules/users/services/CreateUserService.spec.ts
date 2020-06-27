import 'reflect-metadata';
import AppErro from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fake/FakeHashProvider';

describe('CreateUser', () => {
  const userTest = {
    name: 'user',
    email: 'userTest@gmail.com.br',
    password: '123456',
  };

  it('should be able to create new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute(userTest);

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create new user with same email another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute(userTest);

    expect(createUser.execute(userTest)).rejects.toBeInstanceOf(AppErro);
  });
});
