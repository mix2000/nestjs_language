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
exports.LanguageTypeormService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("../../entity/typeorm");
let LanguageTypeormService = class LanguageTypeormService {
    constructor(languageRepository) {
        this.languageRepository = languageRepository;
    }
    // LanguageEntity CRUD Operations
    async findAllLanguages() {
        return this.languageRepository.find();
    }
    async findLanguagesByFilter(filter) {
        return this.languageRepository.find({
            where: filter,
        });
    }
    async findLanguageById(id) {
        return this.languageRepository.findOneBy({ id });
    }
    async createLanguage(data) {
        const language = this.languageRepository.create(data);
        return this.languageRepository.save(language);
    }
    async updateLanguage(id, data) {
        const language = await this.findLanguageById(id);
        this.languageRepository.merge(language, data);
        await this.languageRepository.save(language);
        return language;
    }
    async deleteLanguage(id) {
        const language = await this.findLanguageById(id);
        if (language) {
            await this.languageRepository.remove(language);
        }
    }
};
exports.LanguageTypeormService = LanguageTypeormService;
exports.LanguageTypeormService = LanguageTypeormService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_3.LanguageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LanguageTypeormService);
//# sourceMappingURL=language-typeorm.service.js.map