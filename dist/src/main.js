"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Keuangan API')
        .setDescription('Backend API for Keuangan App')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, documentFactory, {
        swaggerOptions: { persistAuthorization: true },
    });
    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
//# sourceMappingURL=main.js.map