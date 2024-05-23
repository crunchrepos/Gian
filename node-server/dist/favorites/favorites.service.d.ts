import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoritesRepository } from './repositories/favorites.repository';
export declare class FavoritesService {
    private readonly repository;
    constructor(repository: FavoritesRepository);
    create(createFavoriteDto: CreateFavoriteDto): Promise<import("./entities/favorite.entity").FavoriteEntity>;
    listByUserEmail(userEmail: string): Promise<import("./entities/favorite.entity").FavoriteEntity[]>;
    findOne(id: number): Promise<import("./entities/favorite.entity").FavoriteEntity>;
    remove(id: number): Promise<import("./entities/favorite.entity").FavoriteEntity>;
}
