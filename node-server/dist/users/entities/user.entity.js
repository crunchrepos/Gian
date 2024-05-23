"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const openapi = require("@nestjs/swagger");
class UserEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, email: { required: true, type: () => String }, name: { required: true, type: () => String }, createdAt: { required: true, type: () => Date } };
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map