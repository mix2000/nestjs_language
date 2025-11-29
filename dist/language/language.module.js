"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LanguageModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageModule = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const common_1 = require("@nestjs/common");
const language_controller_1 = require("./language.controller");
let LanguageModule = LanguageModule_1 = class LanguageModule {
    static forRoot(options) {
        const imports = [];
        const providers = [];
        const exports = [];
        if (options.orm === 'typeorm') {
            // Ленивая загрузка TypeORM зависимостей
            let TypeOrmModule;
            let LanguageEntity;
            let TranslationEntity;
            let LanguageTypeormService;
            let TranslationTypeormService;
            try {
                TypeOrmModule = require('@nestjs/typeorm').TypeOrmModule;
                const entities = require('./entity/typeorm');
                LanguageEntity = entities.LanguageEntity;
                TranslationEntity = entities.TranslationEntity;
                const services = require('./service/typeorm');
                LanguageTypeormService = services.LanguageTypeormService;
                TranslationTypeormService = services.TranslationTypeormService;
            }
            catch (error) {
                throw new Error('TypeORM dependencies are not installed. Please install: npm install @nestjs/typeorm typeorm');
            }
            imports.push(TypeOrmModule.forFeature([LanguageEntity, TranslationEntity]));
            providers.push({
                provide: 'LANGUAGE_SERVICE',
                useClass: LanguageTypeormService,
            }, {
                provide: 'TRANSLATION_SERVICE',
                useClass: TranslationTypeormService,
            }, LanguageTypeormService, TranslationTypeormService);
            exports.push(LanguageTypeormService, TranslationTypeormService, 'LANGUAGE_SERVICE', 'TRANSLATION_SERVICE');
        }
        else if (options.orm === 'sequelize') {
            // Ленивая загрузка Sequelize зависимостей
            let SequelizeModule;
            let LanguageModel;
            let TranslationModel;
            let LanguageSequelizeService;
            let TranslationSequelizeService;
            try {
                SequelizeModule = require('@nestjs/sequelize').SequelizeModule;
                const models = require('./entity/sequelize');
                LanguageModel = models.LanguageModel;
                TranslationModel = models.TranslationModel;
                const services = require('./service/sequelize');
                LanguageSequelizeService = services.LanguageSequelizeService;
                TranslationSequelizeService = services.TranslationSequelizeService;
            }
            catch (error) {
                throw new Error('Sequelize dependencies are not installed. Please install: npm install @nestjs/sequelize sequelize sequelize-typescript');
            }
            imports.push(SequelizeModule.forFeature([LanguageModel, TranslationModel]));
            providers.push({
                provide: 'LANGUAGE_SERVICE',
                useClass: LanguageSequelizeService,
            }, {
                provide: 'TRANSLATION_SERVICE',
                useClass: TranslationSequelizeService,
            }, LanguageSequelizeService, TranslationSequelizeService);
            exports.push(LanguageSequelizeService, TranslationSequelizeService, 'LANGUAGE_SERVICE', 'TRANSLATION_SERVICE');
        }
        return {
            module: LanguageModule_1,
            imports,
            controllers: [language_controller_1.LanguageController],
            providers,
            exports,
        };
    }
};
exports.LanguageModule = LanguageModule;
exports.LanguageModule = LanguageModule = LanguageModule_1 = __decorate([
    (0, common_1.Module)({})
], LanguageModule);
//# sourceMappingURL=language.module.js.map