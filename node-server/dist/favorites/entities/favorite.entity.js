"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteEntity = void 0;
const openapi = require("@nestjs/swagger");
class FavoriteEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, productId: { required: true, type: () => String }, handle: { required: true, type: () => String }, name: { required: true, type: () => String }, img_url: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, userEmail: { required: true, type: () => String } };
    }
}
exports.FavoriteEntity = FavoriteEntity;
//# sourceMappingURL=favorite.entity.js.map