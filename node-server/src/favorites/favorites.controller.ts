import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundError } from '../common/errors/types/NotFoundError';

@ApiTags("Favorites")
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiResponse({status: 409, description: "A record with this userEmail,productId already exists."})
  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.favoritesService.listByUserEmail(email);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }
}
