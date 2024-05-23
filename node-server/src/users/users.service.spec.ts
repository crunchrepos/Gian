import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/user.repository';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException } from '@nestjs/common';


describe('UsersService', () => {
  let service: UsersService;
  const usersRepository = createMock<UsersRepository>({
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepository,
      ],
    })
      .overrideProvider(UsersRepository)
      .useValue(usersRepository)
      .compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  describe('findOne', () => {
    it('should return user rule sets', async () => {
      const createdAt = new Date()
      jest
        .spyOn(usersRepository, 'findOne')
        .mockResolvedValueOnce({id: 1, email: 'test@email.com', name: 'Test', createdAt});

      const user = await service.findOne('any email')
      expect(user).toStrictEqual({id: 1, email: 'test@email.com', name: 'Test', createdAt})
    });

    it('should return null if user does not exist', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockResolvedValueOnce(null);

        await expect(service.findOne('any email')).rejects.toThrow(NotFoundError); 
    });
  });
   
describe('create', () => {

  it('should create a user', async () => {
    const createdAt = new Date()
    const mockDto = createMock<CreateUserDto>({email: 'test@email.com', name: 'Test'});
    jest
      .spyOn(usersRepository, 'create')
      .mockResolvedValueOnce({id: 1, email: 'test@email.com', name: 'Test', createdAt});

      const user = await service.create(mockDto);
      expect(user).toStrictEqual({id: 1, email: 'test@email.com', name: 'Test', createdAt})
    });
    
    it('should throw an error if already exists', async () => {
    const mockDto = createMock<CreateUserDto>({email: 'test@email.com', name: 'Test'});
    
    jest.spyOn(usersRepository, 'create').mockImplementation(() => {
      throw new ConflictException('Email already exists');
    });
  
    await expect(service.create(mockDto)).rejects.toThrow(ConflictException);
  });
  })

  describe('signIn', () => {
    it('should return a user if a valid email is provided', async () => {
      const createdAt = new Date()
      const mockUser = { id: 1, email: 'test@email.com', name: 'Test', createdAt };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockUser);
  
      const user = await service.signIn('test@email.com');
      expect(user).toStrictEqual(mockUser);
    });
  
    it('should throw an error if an invalid email is provided', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => {
        throw new NotFoundError('User not found');
      });
  
      await expect(service.signIn('invalid email')).rejects.toThrow(NotFoundError);
    });
  });
});