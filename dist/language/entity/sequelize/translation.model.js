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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const language_model_1 = require("./language.model");
let TranslationModel = class TranslationModel extends sequelize_typescript_1.Model {
};
exports.TranslationModel = TranslationModel;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        comment: 'Идентификатор',
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], TranslationModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => language_model_1.LanguageModel),
    (0, sequelize_typescript_1.Column)({
        comment: 'Идентификатор языка',
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], TranslationModel.prototype, "languageId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        comment: 'Идентификатор элемента',
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], TranslationModel.prototype, "elementId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        comment: 'Название поля',
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
    }),
    __metadata("design:type", String)
], TranslationModel.prototype, "fieldName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        comment: 'Идентификатор категории',
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
    }),
    __metadata("design:type", String)
], TranslationModel.prototype, "categoryType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        comment: 'Текстовое значение',
        type: sequelize_typescript_1.DataType.STRING(512),
        allowNull: false,
    }),
    __metadata("design:type", String)
], TranslationModel.prototype, "value", void 0);
exports.TranslationModel = TranslationModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'ozma-translation',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['categoryType', 'elementId', 'languageId', 'fieldName'],
            },
        ],
    })
], TranslationModel);
//# sourceMappingURL=translation.model.js.map