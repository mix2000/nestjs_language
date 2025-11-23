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
exports.LanguageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("./swagger");
let LanguageController = class LanguageController {
    constructor(languageService) {
        this.languageService = languageService;
    }
    async findAll() {
        return this.languageService.findAllLanguages();
    }
    async findOne(id) {
        return this.languageService.findLanguageById(+id);
    }
    async create(languageData) {
        return this.languageService.createLanguage(languageData);
    }
    async update(id, languageData) {
        return this.languageService.updateLanguage(+id, languageData);
    }
    async delete(id) {
        return this.languageService.deleteLanguage(+id);
    }
};
exports.LanguageController = LanguageController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.SwaggerFindAllLanguages)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.SwaggerFindLanguageById)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.SwaggerCreateLanguage)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.SwaggerUpdateLanguage)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.SwaggerDeleteLanguage)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "delete", null);
exports.LanguageController = LanguageController = __decorate([
    (0, common_1.Controller)('languages'),
    __param(0, (0, common_1.Inject)('LANGUAGE_SERVICE')),
    __metadata("design:paramtypes", [Object])
], LanguageController);
//# sourceMappingURL=language.controller.js.map