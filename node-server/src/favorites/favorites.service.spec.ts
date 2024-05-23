import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import { ConflictException } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesRepository } from './repositories/favorites.repository';


describe('FavoritesService', () => {
  let service: FavoritesService;
  const favoritesRepository = createMock<FavoritesRepository>({
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    listByUserEmail: jest.fn(),
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FavoritesService,
        FavoritesRepository,
      ],
    })
      .overrideProvider(FavoritesRepository)
      .useValue(favoritesRepository)
      .compile();

    service = moduleRef.get<FavoritesService>(FavoritesService);
  });

  describe('findOne', () => {
    it('should return favorite', async () => {  
      const createdAt = new Date();
      const updatedAt = new Date();
      const mockFavorite = {id: 1, name: 'White dress', productId: '123', handle: 'white-dress', img_url: 'url', updatedAt, userEmail: 'test@email.com', createdAt}
      jest.spyOn(favoritesRepository, 'findOne').mockResolvedValueOnce(mockFavorite);
      const favorite = await service.findOne(1);
      expect(favorite).toStrictEqual(mockFavorite);
    });

    it('should throw error if favorite does not exist', async () => {
      jest.spyOn(favoritesRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundError);
    });
  });

  describe('remove', () => {
    it('should delete favorite', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const mockFavorite = {id: 1, name: 'White dress', productId: '123', handle: 'white-dress', img_url: 'url', updatedAt, userEmail: 'test@email.com', createdAt};

      jest.spyOn(favoritesRepository, 'findOne').mockResolvedValueOnce(mockFavorite);
      jest.spyOn(favoritesRepository, 'remove').mockResolvedValueOnce(mockFavorite);

      const favorite = await service.remove(1);
      expect(favorite).toStrictEqual(mockFavorite);
    });

    it('should throw error if favorite does not exist', async () => {
      jest.spyOn(favoritesRepository, 'remove').mockResolvedValueOnce(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundError);
    }
    );
  })

  describe('listByUserEmail', () => {
    it('should return favorites', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const mockFavorites = [{id: 1, name: 'White dress', productId: '123', handle: 'white-dress', img_url: 'url', updatedAt, userEmail: 'test@email.com', createdAt}];
      jest.spyOn(favoritesRepository, 'listByUserEmail').mockResolvedValueOnce(mockFavorites);
      const favorites = await service.listByUserEmail('test@email.com');
      expect(favorites).toStrictEqual(mockFavorites);
    });

    it('should throw error if user has no favorites', async () => {
      jest.spyOn(favoritesRepository, 'listByUserEmail').mockResolvedValueOnce(null);
      await expect(service.listByUserEmail('any@email.com')).rejects.toThrow(NotFoundError);
    });
  });
  
  describe('create', () => {
    it('should create a favorite', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const mockDto = {name: 'White dress', productId: '123', handle: 'white-dress', img_url: 'url', userEmail: 'test@test.com'};
      jest.spyOn(favoritesRepository, 'create').mockResolvedValueOnce({id: 1, name: 'White dress', productId: '123', handle: 'white-dress', img_url: 'url', updatedAt, userEmail: 'test@test.com', createdAt});
      const favorite = await service.create(mockDto);
      expect(favorite).toStrictEqual({id: 1, name: 'White dress', productId: '123', handle: 'white-dress', img_url: 'url', updatedAt, userEmail: 'test@test.com', createdAt});
    });
  });
});


  
