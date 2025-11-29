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
exports.TranslationTypeormService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("../../entity/typeorm");
let TranslationTypeormService = class TranslationTypeormService {
    constructor(translationRepository) {
        this.translationRepository = translationRepository;
    }
    async findAllTranslations() {
        return this.translationRepository.find();
    }
    async findTranslationById(id) {
        return this.translationRepository.findOneBy({ id });
    }
    async findTranslationByFilter(filter) {
        return this.translationRepository.find({
            where: filter,
        });
    }
    async createTranslation(data) {
        const translation = this.translationRepository.create(data);
        return this.translationRepository.save(translation);
    }
    async updateTranslation(id, data) {
        const translation = await this.findTranslationById(id);
        this.translationRepository.merge(translation, data);
        await this.translationRepository.save(translation);
        return translation;
    }
    async deleteTranslation(id) {
        const translation = await this.findTranslationById(id);
        if (translation) {
            await this.translationRepository.remove(translation);
        }
    }
    async saveTranslations(categoryType, elementId, fieldName, translations) {
        if (!translations || translations.length === 0) {
            return;
        }
        await Promise.all(translations.map(async (translation) => {
            return this.translationRepository.upsert({
                categoryType,
                elementId,
                fieldName,
                languageId: translation.languageId,
                value: translation.value,
            }, ['categoryType', 'elementId', 'fieldName', 'languageId']);
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
        await this.translationRepository.delete(conditions);
    }
    async deleteTranslationsBatch(categoryType, elementIds) {
        if (!elementIds || elementIds.length === 0) {
            return;
        }
        await this.translationRepository
            .createQueryBuilder()
            .delete()
            .where('categoryType = :categoryType', { categoryType })
            .andWhere('elementId IN (:...elementIds)', { elementIds })
            .execute();
    }
};
exports.TranslationTypeormService = TranslationTypeormService;
exports.TranslationTypeormService = TranslationTypeormService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_3.TranslationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TranslationTypeormService);
//# sourceMappingURL=translation-typeorm.service.js.map