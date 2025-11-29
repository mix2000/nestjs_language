export { LanguageModule, LanguageModuleOptions } from './language/language.module';
export * from './language/interfaces';
export { LanguageController } from './language/language.controller';
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
//# sourceMappingURL=index.d.ts.map