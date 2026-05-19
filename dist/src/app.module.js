"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const accounts_module_1 = require("./accounts/accounts.module");
const categories_module_1 = require("./categories/categories.module");
const transactions_module_1 = require("./transactions/transactions.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const telegram_module_1 = require("./telegram/telegram.module");
const nl_module_1 = require("./nl/nl.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            nestjs_telegraf_1.TelegrafModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    token: configService.getOrThrow('TELEGRAM_BOT_TOKEN'),
                }),
                inject: [config_1.ConfigService],
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            accounts_module_1.AccountsModule,
            categories_module_1.CategoriesModule,
            transactions_module_1.TransactionsModule,
            dashboard_module_1.DashboardModule,
            telegram_module_1.TelegramModule,
            nl_module_1.NlModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map