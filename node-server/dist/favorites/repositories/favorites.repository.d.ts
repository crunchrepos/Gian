import { PrismaService } from "../../prisma/prisma.service";
import { CreateFavoriteDto } from "../dto/create-favorite.dto";
import { FavoriteEntity } from "../entities/favorite.entity";
export declare class FavoritesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createFavoriteDto: CreateFavoriteDto): Promise<FavoriteEntity>;
    findOne(id: number): Promise<FavoriteEntity>;
    listByUserEmail(userEmail: string): Promise<FavoriteEntity[]>;
    remove(id: number): Promise<FavoriteEntity>;
}
