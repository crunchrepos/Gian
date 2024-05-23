import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repositories/user.repository';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import { UserEntity } from './entities/user.entity';
import { UniqueConstraintError } from 'src/common/errors/types/UniqueConstraintError';
import { ConflictError } from '../common/errors/types/ConflictError';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository){}

  async create(createUserDto: CreateUserDto) {
    const user = await this.repository.findOne(createUserDto.email);
    if(user){
      throw new ConflictError('Email already exists')
    }
    return this.repository.create(createUserDto)
  }

  async findOne(email: string): Promise<UserEntity> {
    const user = await this.repository.findOne(email);

    if (!user){
      throw new NotFoundError('User not found')
    }
    return user
  }

  async signIn(email: string): Promise<UserEntity> {
    const user = await this.findOne(email);
    return user
  }
}
