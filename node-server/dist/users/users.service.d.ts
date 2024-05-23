import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';
export declare class UsersService {
    private readonly repository;
    constructor(repository: UsersRepository);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findOne(email: string): Promise<UserEntity>;
    signIn(email: string): Promise<UserEntity>;
}
