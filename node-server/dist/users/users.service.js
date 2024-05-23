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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./repositories/user.repository");
const NotFoundError_1 = require("../common/errors/types/NotFoundError");
const ConflictError_1 = require("../common/errors/types/ConflictError");
let UsersService = class UsersService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(createUserDto) {
        const user = await this.repository.findOne(createUserDto.email);
        if (user) {
            throw new ConflictError_1.ConflictError('Email already exists');
        }
        return this.repository.create(createUserDto);
    }
    async findOne(email) {
        const user = await this.repository.findOne(email);
        if (!user) {
            throw new NotFoundError_1.NotFoundError('User not found');
        }
        return user;
    }
    async signIn(email) {
        const user = await this.findOne(email);
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map