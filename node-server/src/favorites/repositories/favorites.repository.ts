import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateFavoriteDto } from "../dto/create-favorite.dto";
import { FavoriteEntity } from "../entities/favorite.entity";
import { NotFoundError } from "../../common/errors/types/NotFoundError";

@Injectable()
export class FavoritesRepository {
  constructor(private readonly prisma: PrismaService){}

  async create(createFavoriteDto: CreateFavoriteDto): Promise<FavoriteEntity> {
    const {userEmail} = createFavoriteDto

    const user = await this.prisma.user.findUnique({
      where: {
        email: userEmail
      }
    })

    if(!user){
      throw new NotFoundError('User not found.')
    }

    return this.prisma.favorite.create({
      data: createFavoriteDto,
    })
  }

  async findOne(id: number): Promise<FavoriteEntity>{
    return this.prisma.favorite.findUnique({
      where: {
        id
      }
    })
  }

  async listByUserEmail(userEmail: string): Promise<FavoriteEntity[]>{
    const user = await this.prisma.user.findUnique({
      where: {
        email: userEmail
      }
    })

    if(!user){
      throw new NotFoundError('User not found.')
    }

    return this.prisma.favorite.findMany({
      where: {
        userEmail
      }
    })
  }

  async remove(id: number): Promise<FavoriteEntity> {
    return this.prisma.favorite.delete({
      where: {
        id,
      },
    });
  }
}