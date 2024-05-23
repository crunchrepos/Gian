"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const NotFoundError_1 = require("../../common/errors/types/NotFoundError");
let FavoritesRepository = class FavoritesRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createFavoriteDto) {
        const { userEmail } = createFavoriteDto;
        const user = await this.prisma.user.findUnique({
            where: {
                email: userEmail
            }
        });
        if (!user) {
            throw new NotFoundError_1.NotFoundError('User not found.');
        }
        return this.prisma.favorite.create({
            data: createFavoriteDto,
        });
    }
    async findOne(id) {
        return this.prisma.favorite.findUnique({
            where: {
                id
            }
        });
    }
    async listByUserEmail(userEmail) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: userEmail
            }
        });
        if (!user) {
            throw new NotFoundError_1.NotFoundError('User not found.');
        }
        return this.prisma.favorite.findMany({
            where: {
                userEmail
            }
        });
    }
    async remove(id) {
        return this.prisma.favorite.delete({
            where: {
                id,
            },
        });
    }
};
exports.FavoritesRepository = FavoritesRepository;
exports.FavoritesRepository = FavoritesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoritesRepository);
//# sourceMappingURL=favorites.repository.js.map