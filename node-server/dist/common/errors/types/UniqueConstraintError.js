"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueConstraintError = void 0;
const ConflictError_1 = require("./ConflictError");
class UniqueConstraintError extends ConflictError_1.ConflictError {
    constructor(e) {
        const uniqueField = e.meta.target;
        super(`A record with this ${uniqueField} already exists.`);
    }
}
exports.UniqueConstraintError = UniqueConstraintError;
//# sourceMappingURL=UniqueConstraintError.js.map