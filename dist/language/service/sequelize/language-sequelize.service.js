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
exports.LanguageSequelizeService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("../../entity/sequelize");
let LanguageSequelizeService = class LanguageSequelizeService {
    constructor(languageModel) {
        this.languageModel = languageModel;
    }
    async findAllLanguages() {
        return this.languageModel.findAll();
    }
    async findLanguagesByFilter(filter) {
        const where = Array.isArray(filter) ? { [Symbol.for('or')]: filter } : filter;
        return this.languageModel.findAll({
            where: where,
        });
    }
    async findLanguageById(id) {
        return this.languageModel.findByPk(id);
    }
    async createLanguage(data) {
        return this.languageModel.create(data);
    }
    async updateLanguage(id, data) {
        const language = await this.findLanguageById(id);
        if (!language) {
            throw new Error(`Language with id ${id} not found`);
        }
        await this.languageModel.update(data, {
            where: { id },
        });
        return this.findLanguageById(id);
    }
    async deleteLanguage(id) {
        const language = await this.findLanguageById(id);
        if (language) {
            await this.languageModel.destroy({
                where: { id },
            });
        }
    }
};
exports.LanguageSequelizeService = LanguageSequelizeService;
exports.LanguageSequelizeService = LanguageSequelizeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(sequelize_2.LanguageModel)),
    __metadata("design:paramtypes", [Object])
], LanguageSequelizeService);
//# sourceMappingURL=language-sequelize.service.js.map