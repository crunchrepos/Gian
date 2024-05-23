import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteEntity } from './entities/favorite.entity';
import { FavoritesRepository } from './repositories/favorites.repository';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundError } from '../common/errors/types/NotFoundError';

describe('FavoritesController', () => {
  let controller: FavoritesController;
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [FavoritesService, FavoritesRepository, PrismaService],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
    service = module.get<FavoritesService>(FavoritesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Creation', () => {
    it('should create a favorite', async () => {
      const favoriteDto: CreateFavoriteDto = { productId: '1', handle: 'test', name: 'Test', img_url: 'http://test.com', userEmail: 'test@test.com' };
      const favoriteEntity: FavoriteEntity = { id: 1, productId: '1', handle: 'test', name: 'Test', img_url: 'http://test.com', userEmail: 'test@test.com', createdAt: new Date(), updatedAt: new Date() };
      jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(favoriteEntity));

      expect(await controller.create(favoriteDto)).toBe(favoriteEntity);
    });
  });
  

  describe('Find', () => {
    it('should find one favorite', async () => {
      const email = 'test@test.com';
      const favoriteEntity: FavoriteEntity = { id: 1, productId: '1', handle: 'test', name: 'Test', img_url: 'http://test.com', userEmail: 'test@test.com', createdAt: new Date(), updatedAt: new Date() };
      jest.spyOn(service, 'listByUserEmail').mockImplementation(() => Promise.resolve([favoriteEntity]));

      expect(await controller.findOne(email)).toEqual([favoriteEntity]);
    });

    it('should throw error when finding favorites of a non-existing user', async () => {
      const email = 'nonexistent@test.com';
      jest.spyOn(service, 'listByUserEmail').mockImplementation(() => Promise.reject(new NotFoundError('User has no favorites')));

      await expect(controller.findOne(email)).rejects.toThrow(NotFoundError);
    });
  });

  describe('Removal', () => {
    it('should remove a favorite', async () => {
      const id = '1';
      const favoriteEntity: FavoriteEntity = { id: 1, productId: '1', handle: 'test', name: 'Test', img_url: 'http://test.com', userEmail: 'test@test.com', createdAt: new Date(), updatedAt: new Date() };
      jest.spyOn(service, 'remove').mockImplementation(() => Promise.resolve(favoriteEntity));
    
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
    
    it('should throw error when removing a non-existing favorite', async () => {
      const id = '999';
      jest.spyOn(service, 'remove').mockImplementation(() => Promise.reject(new NotFoundError('Favorite not found')));
    
      await expect(controller.remove(id)).rejects.toThrow(NotFoundError);
    });
    

    it('should throw error when removing a non-existing favorite', async () => {
      const id = '999';
      jest.spyOn(service, 'findOne').mockImplementation(() => Promise.reject(new NotFoundError('Favorite not found')));

      await expect(controller.remove(id)).rejects.toThrow(NotFoundError);
    });
  });
});
