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
exports.CreateFavoriteDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFavoriteDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { productId: { required: true, type: () => String }, handle: { required: true, type: () => String }, name: { required: true, type: () => String }, img_url: { required: true, type: () => String }, userEmail: { required: true, type: () => String } };
    }
}
exports.CreateFavoriteDto = CreateFavoriteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Shopify Product ID" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFavoriteDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Shopify Product Handle" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFavoriteDto.prototype, "handle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Shopify Product Name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFavoriteDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product URL" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFavoriteDto.prototype, "img_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User Email Who Favorited" }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFavoriteDto.prototype, "userEmail", void 0);
//# sourceMappingURL=create-favorite.dto.js.map