import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoritesRepository } from './repositories/favorites.repository';
import { NotFoundError } from '../common/errors/types/NotFoundError';

@Injectable()
export class FavoritesService {
  constructor (private readonly repository: FavoritesRepository){}
  create(createFavoriteDto: CreateFavoriteDto) {
    return this.repository.create(createFavoriteDto)
  }

  async listByUserEmail(userEmail: string) {
    const favorites = await this.repository.listByUserEmail(userEmail)
    if(!favorites){
      throw new NotFoundError('User has no favorites')
    }
    return favorites
  }

  async findOne(id: number) {
    const favorite = await this.repository.findOne(id);
    if(!favorite){
      throw new NotFoundError('Favorite not found')
    }
    return favorite
  }

  async remove(id: number) {
    const favorite = await this.repository.findOne(id);
    if(!favorite){
      throw new NotFoundError('Favorite not found')
    }
    return this.repository.remove(id)
  }
}
