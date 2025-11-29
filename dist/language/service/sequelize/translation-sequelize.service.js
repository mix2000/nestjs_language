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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationSequelizeService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("../../entity/sequelize");
let TranslationSequelizeService = class TranslationSequelizeService {
    constructor(translationModel) {
        this.translationModel = translationModel;
    }
    async findAllTranslations() {
        return this.translationModel.findAll();
    }
    async findTranslationById(id) {
        return this.translationModel.findByPk(id);
    }
    async findTranslationByFilter(filter) {
        const where = Array.isArray(filter) ? { [Symbol.for('or')]: filter } : filter;
        return this.translationModel.findAll({
            where: where,
        });
    }
    async createTranslation(data) {
        return this.translationModel.create(data);
    }
    async updateTranslation(id, data) {
        const translation = await this.findTranslationById(id);
        if (!translation) {
            throw new Error(`Translation with id ${id} not found`);
        }
        await this.translationModel.update(data, {
            where: { id },
        });
        return this.findTranslationById(id);
    }
    async deleteTranslation(id) {
        const translation = await this.findTranslationById(id);
        if (translation) {
            await this.translationModel.destroy({
                where: { id },
            });
        }
    }
    async saveTranslations(categoryType, elementId, fieldName, translations) {
        if (!translations || translations.length === 0) {
            return;
        }
        await Promise.all(translations.map(async (translation) => {
            return this.translationModel.upsert({
                categoryType,
                elementId,
                fieldName,
                languageId: translation.languageId,
                value: translation.value,
            });
        }));
    }
    async deleteTranslations(categoryType, elementId, fieldName) {
        const conditions = {
            categoryType,
            elementId,
        };
        if (fieldName) {
            conditions.fieldName = fieldName;
        }
        await this.translationModel.destroy({
            where: conditions,
        });
    }
    async deleteTranslationsBatch(categoryType, elementIds) {
        if (!elementIds || elementIds.length === 0) {
            return;
        }
        await this.translationModel.destroy({
            where: {
                categoryType,
                elementId: elementIds,
            },
        });
    }
};
exports.TranslationSequelizeService = TranslationSequelizeService;
exports.TranslationSequelizeService = TranslationSequelizeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(sequelize_2.TranslationModel)),
    __metadata("design:paramtypes", [Object])
], TranslationSequelizeService);
//# sourceMappingURL=translation-sequelize.service.js.map