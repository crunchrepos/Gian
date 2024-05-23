import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";
export declare class UsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findOne(email: string): Promise<UserEntity>;
    remove(email: string): Promise<UserEntity>;
}
