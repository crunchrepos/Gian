import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").UserEntity>;
    findOne(email: string): Promise<import("./entities/user.entity").UserEntity>;
    signIn(body: {
        email: string;
    }): Promise<import("./entities/user.entity").UserEntity>;
}
