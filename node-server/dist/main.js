"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const unauthorized_interceptor_1 = require("./common/errors/interceptors/unauthorized.interceptor");
const notfound_interceptor_1 = require("./common/errors/interceptors/notfound.interceptor");
const conflict_interceptor_1 = require("./common/errors/interceptors/conflict.interceptor");
const database_interceptor_1 = require("./common/errors/interceptors/database.interceptor");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Crunch API')
        .setDescription('Crunch API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    app.useGlobalInterceptors(new conflict_interceptor_1.ConflictInterceptor());
    app.useGlobalInterceptors(new database_interceptor_1.DatabaseInterceptor());
    app.useGlobalInterceptors(new unauthorized_interceptor_1.UnauthorizedInterceptor());
    app.useGlobalInterceptors(new notfound_interceptor_1.NotFoundInterceptor());
    await app.listen(process.env.PORT || 8080);
}
bootstrap();
//# sourceMappingURL=main.js.map