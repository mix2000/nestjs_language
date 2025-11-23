# Примеры использования ozma-nestjs-language

## Быстрый старт с TypeORM

### 1. Установка

```bash
npm install ozma-nestjs-language @nestjs/typeorm typeorm
```

### 2. Подключение модуля

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageModule } from 'ozma-nestjs-language';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'mydb',
            autoLoadEntities: true,
            synchronize: true, // только для разработки!
        }),
        LanguageModule.forRoot({ orm: 'typeorm' }),
    ],
})
export class AppModule {}
```

### 3. Использование в сервисе

```typescript
// my.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ILanguageService } from 'ozma-nestjs-language';

@Injectable()
export class MyService {
    constructor(
        @Inject('LANGUAGE_SERVICE')
        private languageService: ILanguageService,
    ) {}

    async initializeLanguages() {
        // Создаем языки
        await this.languageService.createLanguage({
            name: 'English',
            abbreviation: 'en',
        });

        await this.languageService.createLanguage({
            name: 'Русский',
            abbreviation: 'ru',
        });

        // Получаем все языки
        const languages = await this.languageService.findAllLanguages();
        console.log('Languages:', languages);
    }
}
```

## Быстрый старт с Sequelize

### 1. Установка

```bash
npm install ozma-nestjs-language @nestjs/sequelize sequelize sequelize-typescript mysql2
```

### 2. Подключение модуля

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LanguageModule } from 'ozma-nestjs-language';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'mydb',
            autoLoadModels: true,
            synchronize: true, // только для разработки!
        }),
        LanguageModule.forRoot({ orm: 'sequelize' }),
    ],
})
export class AppModule {}
```

### 3. Использование в сервисе

```typescript
// my.service.ts
import { Injectable } from '@nestjs/common';
import { LanguageSequelizeService, TranslationSequelizeService } from 'ozma-nestjs-language';

@Injectable()
export class MyService {
    constructor(
        private languageService: LanguageSequelizeService,
        private translationService: TranslationSequelizeService,
    ) {}

    async createProductTranslations() {
        // Предполагаем, что языки уже созданы
        const languages = await this.languageService.findAllLanguages();
        
        for (const lang of languages) {
            await this.translationService.createTranslation({
                languageId: lang.id,
                elementId: 1, // ID продукта
                fieldName: 'title',
                categoryType: 'product',
                value: lang.abbreviation === 'en' ? 'Product Title' : 'Название продукта',
            });
        }
    }

    async getTranslations(productId: number) {
        // Получаем все переводы для продукта
        const translations = await this.translationService.findTranslationByFilter({
            elementId: productId,
            categoryType: 'product',
        });
        
        return translations;
    }
}
```

## Расширенные примеры

### Массовые операции с переводами

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { ITranslationService } from 'ozma-nestjs-language';

@Injectable()
export class BulkTranslationService {
    constructor(
        @Inject('TRANSLATION_SERVICE')
        private translationService: ITranslationService,
    ) {}

    // Сохранить или обновить переводы для элемента (upsert)
    async updateProductTranslations(productId: number, nameTranslations: Array<{ languageId: number; value: string }>) {
        await this.translationService.saveTranslations(
            'product',
            productId,
            'name',
            nameTranslations
        );
    }

    // Пример: обновить название и описание для продукта
    async updateProductNameAndDescription(
        productId: number,
        names: Array<{ languageId: number; value: string }>,
        descriptions: Array<{ languageId: number; value: string }>
    ) {
        await Promise.all([
            this.translationService.saveTranslations('product', productId, 'name', names),
            this.translationService.saveTranslations('product', productId, 'description', descriptions),
        ]);
    }

    // Удалить все переводы для продукта
    async deleteProductTranslations(productId: number) {
        await this.translationService.deleteTranslations('product', productId);
    }

    // Удалить только переводы названия продукта
    async deleteProductNameTranslations(productId: number) {
        await this.translationService.deleteTranslations('product', productId, 'name');
    }

    // Удалить переводы для нескольких продуктов сразу
    async deleteMultipleProducts(productIds: number[]) {
        await this.translationService.deleteTranslationsBatch('product', productIds);
    }

    // Практический пример: обновление каталога
    async updateCatalogItems(items: Array<{ id: number; translations: any }>) {
        for (const item of items) {
            await this.translationService.saveTranslations(
                'catalog',
                item.id,
                'title',
                item.translations
            );
        }
    }

    // Очистка старых переводов при удалении элементов
    async cleanupDeletedItems(categoryType: string, deletedIds: number[]) {
        if (deletedIds.length > 0) {
            await this.translationService.deleteTranslationsBatch(categoryType, deletedIds);
        }
    }
}
```

### Работа с переводами по фильтру

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { ITranslationService } from 'ozma-nestjs-language';

@Injectable()
export class TranslationService {
    constructor(
        @Inject('TRANSLATION_SERVICE')
        private translationService: ITranslationService,
    ) {}

    // Получить все переводы для конкретного языка
    async getTranslationsByLanguage(languageId: number) {
        return this.translationService.findTranslationByFilter({ languageId });
    }

    // Получить переводы для конкретного элемента
    async getElementTranslations(elementId: number, categoryType: string) {
        return this.translationService.findTranslationByFilter({
            elementId,
            categoryType,
        });
    }

    // Получить конкретный перевод
    async getSpecificTranslation(
        languageId: number,
        elementId: number,
        fieldName: string,
        categoryType: string,
    ) {
        const translations = await this.translationService.findTranslationByFilter({
            languageId,
            elementId,
            fieldName,
            categoryType,
        });
        
        return translations[0] || null;
    }
}
```

### CRUD операции с языками

```typescript
import { Injectable } from '@nestjs/common';
import { LanguageTypeormService } from 'ozma-nestjs-language';

@Injectable()
export class LanguageManagementService {
    constructor(private languageService: LanguageTypeormService) {}

    // Создать новый язык
    async addLanguage(name: string, abbreviation: string) {
        return this.languageService.createLanguage({ name, abbreviation });
    }

    // Обновить язык
    async updateLanguageName(id: number, newName: string) {
        return this.languageService.updateLanguage(id, { name: newName });
    }

    // Удалить язык
    async removeLanguage(id: number) {
        await this.languageService.deleteLanguage(id);
    }

    // Проверить существование языка
    async languageExists(abbreviation: string): Promise<boolean> {
        const languages = await this.languageService.findLanguagesByFilter({
            abbreviation,
        });
        
        return languages.length > 0;
    }

    // Получить язык по аббревиатуре
    async getLanguageByAbbreviation(abbreviation: string) {
        const languages = await this.languageService.findLanguagesByFilter({
            abbreviation,
        });
        
        return languages[0] || null;
    }
}
```

### Использование в контроллере (кастомный)

```typescript
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { LanguageSequelizeService, TranslationSequelizeService } from 'ozma-nestjs-language';

@Controller('api/translations')
export class CustomTranslationController {
    constructor(
        private languageService: LanguageSequelizeService,
        private translationService: TranslationSequelizeService,
    ) {}

    // Получить все переводы для элемента
    @Get('element/:id')
    async getElementTranslations(
        @Param('id') elementId: string,
        @Query('category') categoryType: string,
    ) {
        return this.translationService.findTranslationByFilter({
            elementId: +elementId,
            categoryType,
        });
    }

    // Создать набор переводов для элемента
    @Post('bulk')
    async createBulkTranslations(
        @Body() data: {
            elementId: number;
            categoryType: string;
            fieldName: string;
            translations: Array<{ languageId: number; value: string }>;
        },
    ) {
        const results = [];
        
        for (const trans of data.translations) {
            const created = await this.translationService.createTranslation({
                languageId: trans.languageId,
                categoryType: data.categoryType,
                value: trans.value,
            });
            results.push(created);
        }
        
        return results;
    }

    // Получить переводы с языками
    @Get('with-languages/:categoryType')
    async getTranslationsWithLanguages(@Param('categoryType') categoryType: string) {
        const translations = await this.translationService.findTranslationByFilter({
            categoryType,
        });
        
        const languages = await this.languageService.findAllLanguages();
        
        return {
            translations,
            languages,
        };
    }
}
```

## Полезные паттерны

### Хелпер для работы с мультиязычностью

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { ILanguageService, ITranslationService } from 'ozma-nestjs-language';

@Injectable()
export class I18nHelper {
    constructor(
        @Inject('LANGUAGE_SERVICE') private languageService: ILanguageService,
        @Inject('TRANSLATION_SERVICE') private translationService: ITranslationService,
    ) {}

    // Получить переведенное значение
    async getTranslatedValue(
        languageAbbr: string,
        elementId: number,
        fieldName: string,
        categoryType: string,
    ): Promise<string | null> {
        // Найти язык по аббревиатуре
        const languages = await this.languageService.findLanguagesByFilter({
            abbreviation: languageAbbr,
        });
        
        if (languages.length === 0) {
            return null;
        }

        // Найти перевод
        const translations = await this.translationService.findTranslationByFilter({
            languageId: languages[0].id,
            elementId,
            fieldName,
            categoryType,
        });

        return translations[0]?.value || null;
    }

    // Получить все переводы для объекта
    async getObjectTranslations(elementId: number, categoryType: string) {
        const translations = await this.translationService.findTranslationByFilter({
            elementId,
            categoryType,
        });

        const languages = await this.languageService.findAllLanguages();

        // Группировка по полям и языкам
        const result: Record<string, Record<string, string>> = {};

        for (const trans of translations) {
            const lang = languages.find((l) => l.id === trans.languageId);
            if (!lang) continue;

            if (!result[trans.fieldName]) {
                result[trans.fieldName] = {};
            }

            result[trans.fieldName][lang.abbreviation] = trans.value;
        }

        return result;
    }

    // Сохранить переводы для объекта
    async saveObjectTranslations(
        elementId: number,
        categoryType: string,
        data: Record<string, Record<string, string>>, // { fieldName: { lang: value } }
    ) {
        const languages = await this.languageService.findAllLanguages();

        for (const [fieldName, translations] of Object.entries(data)) {
            for (const [langAbbr, value] of Object.entries(translations)) {
                const lang = languages.find((l) => l.abbreviation === langAbbr);
                if (!lang) continue;

                // Проверяем существование перевода
                const existing = await this.translationService.findTranslationByFilter({
                    languageId: lang.id,
                    elementId,
                    fieldName,
                    categoryType,
                });

                if (existing.length > 0) {
                    // Обновляем
                    await this.translationService.updateTranslation(existing[0].id, { value });
                } else {
                    // Создаем
                    await this.translationService.createTranslation({
                        languageId: lang.id,
                        categoryType,
                        value,
                    });
                }
            }
        }
    }
}
```

## SQL миграции

### TypeORM миграция

```typescript
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateLanguageTables1234567890 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'ozma-language',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '200',
                    },
                    {
                        name: 'abbreviation',
                        type: 'varchar',
                        length: '5',
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'ozma-translation',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'languageId',
                        type: 'int',
                    },
                    {
                        name: 'elementId',
                        type: 'int',
                    },
                    {
                        name: 'fieldName',
                        type: 'varchar',
                        length: '32',
                    },
                    {
                        name: 'categoryType',
                        type: 'varchar',
                        length: '20',
                    },
                    {
                        name: 'value',
                        type: 'varchar',
                        length: '512',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'ozma-translation',
            new TableForeignKey({
                columnNames: ['languageId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'ozma-language',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createIndex('ozma-translation', {
            name: 'IDX_UNIQUE_TRANSLATION',
            columnNames: ['categoryType', 'elementId', 'languageId', 'fieldName'],
            isUnique: true,
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('ozma-translation');
        await queryRunner.dropTable('ozma-language');
    }
}
```

## Тестирование

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { LanguageModule, ILanguageService } from 'ozma-nestjs-language';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('LanguageService', () => {
    let service: ILanguageService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
                LanguageModule.forRoot({ orm: 'typeorm' }),
            ],
        }).compile();

        service = module.get<ILanguageService>('LANGUAGE_SERVICE');
    });

    it('should create a language', async () => {
        const language = await service.createLanguage({
            name: 'English',
            abbreviation: 'en',
        });

        expect(language).toBeDefined();
        expect(language.name).toBe('English');
        expect(language.abbreviation).toBe('en');
    });

    it('should find all languages', async () => {
        await service.createLanguage({ name: 'English', abbreviation: 'en' });
        await service.createLanguage({ name: 'Русский', abbreviation: 'ru' });

        const languages = await service.findAllLanguages();
        expect(languages).toHaveLength(2);
    });
});
```
