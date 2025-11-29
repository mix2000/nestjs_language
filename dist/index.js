"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageController = exports.LanguageModule = void 0;
// Module
var language_module_1 = require("./language/language.module");
Object.defineProperty(exports, "LanguageModule", { enumerable: true, get: function () { return language_module_1.LanguageModule; } });
// Interfaces
__exportStar(require("./language/interfaces"), exports);
// Controller
var language_controller_1 = require("./language/language.controller");
Object.defineProperty(exports, "LanguageController", { enumerable: true, get: function () { return language_controller_1.LanguageController; } });
/**
 * ВАЖНО: Сервисы и модели не экспортируются напрямую, чтобы избежать загрузки ненужных зависимостей.
 *
 * Используйте инъекцию через токены:
 * @Inject('LANGUAGE_SERVICE') private languageService: ILanguageService
 * @Inject('TRANSLATION_SERVICE') private translationService: ITranslationService
 *
 * Если вам нужен прямой доступ к конкретной реализации:
 * - TypeORM: import { LanguageTypeormService } from 'ozma-nestjs-language/dist/language/service/typeorm/language-typeorm.service'
 * - Sequelize: import { LanguageSequelizeService } from 'ozma-nestjs-language/dist/language/service/sequelize/language-sequelize.service'
 */
//# sourceMappingURL=index.js.map