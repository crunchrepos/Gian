import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritesRepository } from './repositories/favorites.repository';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService, FavoritesRepository],
})
export class FavoritesModule {}
