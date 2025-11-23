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
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const typeorm_1 = require("@nestjs/typeorm");
const entity_1 = require("./entity");
const language_controller_1 = require("./language.controller");
const service_1 = require("./service");
let LanguageModule = LanguageModule_1 = class LanguageModule {
    static forRoot(options) {
        const imports = [];
        const providers = [];
        const exports = [];
        if (options.orm === 'typeorm') {
            imports.push(typeorm_1.TypeOrmModule.forFeature([entity_1.LanguageEntity, entity_1.TranslationEntity]));
            providers.push({
                provide: 'LANGUAGE_SERVICE',
                useClass: service_1.LanguageTypeormService,
            }, {
                provide: 'TRANSLATION_SERVICE',
                useClass: service_1.TranslationTypeormService,
            }, service_1.LanguageTypeormService, service_1.TranslationTypeormService);
            exports.push(service_1.LanguageTypeormService, service_1.TranslationTypeormService, 'LANGUAGE_SERVICE', 'TRANSLATION_SERVICE');
        }
        else if (options.orm === 'sequelize') {
            imports.push(sequelize_1.SequelizeModule.forFeature([entity_1.LanguageModel, entity_1.TranslationModel]));
            providers.push({
                provide: 'LANGUAGE_SERVICE',
                useClass: service_1.LanguageSequelizeService,
            }, {
                provide: 'TRANSLATION_SERVICE',
                useClass: service_1.TranslationSequelizeService,
            }, service_1.LanguageSequelizeService, service_1.TranslationSequelizeService);
            exports.push(service_1.LanguageSequelizeService, service_1.TranslationSequelizeService, 'LANGUAGE_SERVICE', 'TRANSLATION_SERVICE');
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