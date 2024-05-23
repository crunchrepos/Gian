import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './repositories/user.repository';
import { ConflictError } from '../common/errors/types/ConflictError';
import { NotFoundError } from '../common/errors/types/NotFoundError';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService, UsersRepository],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const userDto: CreateUserDto = { email: 'test@test.com', name: 'Test' };
    const userEntity: UserEntity = { id: 1, email: 'test@test.com', name: 'Test', createdAt: new Date() };
    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(userEntity));

    expect(await controller.create(userDto)).toBe(userEntity);
  });

  it('should find one user', async () => {
    const email = 'test@test.com';
    const userEntity: UserEntity = { id: 1, email: 'test@test.com', name: 'Test', createdAt: new Date() };
    jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(userEntity));

    expect(await controller.findOne(email)).toEqual(userEntity);
  });

  it('should sign in a user', async () => {
    const email = 'test@test.com';
    const userEntity: UserEntity = { id: 1, email: 'test@test.com', name: 'Test', createdAt: new Date() };
    jest.spyOn(service, 'signIn').mockImplementation(() => Promise.resolve(userEntity));

    expect(await controller.signIn({ email })).toEqual(userEntity);
  });

  it('should throw error when creating a user with an existing email', async () => {
    const userDto: CreateUserDto = { email: 'test@test.com', name: 'Test' };
    const userEntity: UserEntity = { id: 1, email: 'test@test.com', name: 'Test', createdAt: new Date() };
    jest.spyOn(service, 'create').mockImplementation(() => Promise.reject(new ConflictError('Email already exists')));
  
    await expect(controller.create(userDto)).rejects.toThrow(ConflictError);
  });
  
  it('should throw error when signing in with a non-existing email', async () => {
    const email = 'nonexistent@test.com';
    jest.spyOn(service, 'signIn').mockImplementation(() => Promise.reject(new NotFoundError('User not found')));
  
    await expect(controller.signIn({ email })).rejects.toThrow(NotFoundError);
  });
  
});
