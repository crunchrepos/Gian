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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const favorites_service_1 = require("./favorites.service");
const create_favorite_dto_1 = require("./dto/create-favorite.dto");
const swagger_1 = require("@nestjs/swagger");
let FavoritesController = class FavoritesController {
    constructor(favoritesService) {
        this.favoritesService = favoritesService;
    }
    create(createFavoriteDto) {
        return this.favoritesService.create(createFavoriteDto);
    }
    findOne(email) {
        return this.favoritesService.listByUserEmail(email);
    }
    async remove(id) {
        return this.favoritesService.remove(+id);
    }
};
exports.FavoritesController = FavoritesController;
__decorate([
    (0, swagger_1.ApiResponse)({ status: 409, description: "A record with this userEmail,productId already exists." }),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/favorite.entity").FavoriteEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_favorite_dto_1.CreateFavoriteDto]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':email'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/favorite.entity").FavoriteEntity] }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/favorite.entity").FavoriteEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "remove", null);
exports.FavoritesController = FavoritesController = __decorate([
    (0, swagger_1.ApiTags)("Favorites"),
    (0, common_1.Controller)('favorites'),
    __metadata("design:paramtypes", [favorites_service_1.FavoritesService])
], FavoritesController);
//# sourceMappingURL=favorites.controller.js.map