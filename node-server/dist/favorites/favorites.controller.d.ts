import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    create(createFavoriteDto: CreateFavoriteDto): Promise<import("./entities/favorite.entity").FavoriteEntity>;
    findOne(email: string): Promise<import("./entities/favorite.entity").FavoriteEntity[]>;
    remove(id: string): Promise<import("./entities/favorite.entity").FavoriteEntity>;
}
