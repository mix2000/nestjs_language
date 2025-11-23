# Ozma NestJS Language Module

Модуль для управления языками и переводами в NestJS приложениях с поддержкой TypeORM и Sequelize.

## Возможности

- ✅ Поддержка TypeORM и Sequelize-TypeScript
- ✅ Готовые CRUD операции для языков и переводов
- ✅ REST API контроллер из коробки
- ✅ Swagger документация
- ✅ TypeScript типизация
- ✅ Гибкая фильтрация данных

## Установка

```bash
npm install ozma-nestjs-language
```

### Дополнительные зависимости

#### Для TypeORM:
```bash
npm install @nestjs/typeorm typeorm
```

#### Для Sequelize:
```bash
npm install @nestjs/sequelize sequelize sequelize-typescript
```

## Использование

### С TypeORM

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageModule } from 'ozma-nestjs-language';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'user',
            password: 'password',
            database: 'mydb',
            autoLoadEntities: true,
            synchronize: true,
        }),
        LanguageModule.forRoot({ orm: 'typeorm' }),
    ],
})
export class AppModule {}
```

### С Sequelize

```typescript
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LanguageModule } from 'ozma-nestjs-language';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'user',
            password: 'password',
            database: 'mydb',
            autoLoadModels: true,
            synchronize: true,
        }),
        LanguageModule.forRoot({ orm: 'sequelize' }),
    ],
})
export class AppModule {}
```

## API Endpoints

После подключения модуля доступны следующие эндпоинты:

### Языки (Languages)

- `GET /languages` - Получить все языки
- `GET /languages/:id` - Получить язык по ID
- `POST /languages` - Создать новый язык
  ```json
  {
    "name": "English",
    "abbreviation": "en"
  }
  ```
- `PUT /languages/:id` - Обновить язык
- `DELETE /languages/:id` - Удалить язык

## Использование сервисов

### Инъекция через токены

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { ILanguageService, ITranslationService } from 'ozma-nestjs-language';

@Injectable()
export class MyService {
    constructor(
        @Inject('LANGUAGE_SERVICE') 
        private languageService: ILanguageService,
        @Inject('TRANSLATION_SERVICE') 
        private translationService: ITranslationService,
    ) {}

    async getLanguages() {
        return this.languageService.findAllLanguages();
    }
}
```

### Прямая инъекция (TypeORM)

```typescript
import { Injectable } from '@nestjs/common';
import { LanguageTypeormService, TranslationTypeormService } from 'ozma-nestjs-language';

@Injectable()
export class MyService {
    constructor(
        private languageService: LanguageTypeormService,
        private translationService: TranslationTypeormService,
    ) {}
}
```

### Прямая инъекция (Sequelize)

```typescript
import { Injectable } from '@nestjs/common';
import { LanguageSequelizeService, TranslationSequelizeService } from 'ozma-nestjs-language';

@Injectable()
export class MyService {
    constructor(
        private languageService: LanguageSequelizeService,
        private translationService: TranslationSequelizeService,
    ) {}
}
```

## Модели данных

### Language

| Поле         | Тип    | Описание           |
|--------------|--------|--------------------|
| id           | number | Идентификатор      |
| name         | string | Название языка     |
| abbreviation | string | Аббревиатура (en, ru) |

### Translation

| Поле         | Тип    | Описание                |
|--------------|--------|-------------------------|
| id           | number | Идентификатор           |
| languageId   | number | ID языка (FK)           |
| elementId    | number | ID элемента             |
| fieldName    | string | Название поля           |
| categoryType | string | Тип категории           |
| value        | string | Значение перевода       |

Для `Translation` создан уникальный индекс на комбинацию полей: `(categoryType, elementId, languageId, fieldName)`

## Интерфейсы сервисов

### ILanguageService

```typescript
interface ILanguageService {
    findLanguagesByFilter(filter: FilterOptions<ILanguage>): Promise<ILanguage[]>;
    findAllLanguages(): Promise<ILanguage[]>;
    findLanguageById(id: number): Promise<ILanguage>;
    createLanguage(data: { name: string; abbreviation: string }): Promise<ILanguage>;
    updateLanguage(id: number, data: { name?: string; abbreviation?: string }): Promise<ILanguage>;
    deleteLanguage(id: number): Promise<void>;
}
```

### ITranslationService

```typescript
interface ITranslationService {
    // Базовые CRUD операции
    findTranslationByFilter(filter: FilterOptions<ITranslation>): Promise<ITranslation[]>;
    findAllTranslations(): Promise<ITranslation[]>;
    findTranslationById(id: number): Promise<ITranslation>;
    createTranslation(data: { languageId: number; categoryType: string; value: string }): Promise<ITranslation>;
    updateTranslation(id: number, data: { languageId?: number; categoryType?: string; value?: string }): Promise<ITranslation>;
    deleteTranslation(id: number): Promise<void>;
    
    // Расширенные методы
    saveTranslations(categoryType: string, elementId: number, fieldName: string, translations?: ITranslationData[]): Promise<void>;
    deleteTranslations(categoryType: string, elementId: number, fieldName?: string): Promise<void>;
    deleteTranslationsBatch(categoryType: string, elementIds: number[]): Promise<void>;
}
```

## Примеры использования

### Создание языка

```typescript
const language = await languageService.createLanguage({
    name: 'Русский',
    abbreviation: 'ru',
});
```

### Поиск по фильтру

```typescript
// Один фильтр
const languages = await languageService.findLanguagesByFilter({ 
    abbreviation: 'en' 
});

// Несколько условий (OR)
const languages = await languageService.findLanguagesByFilter([
    { abbreviation: 'en' },
    { abbreviation: 'ru' },
]);
```

### Создание перевода

```typescript
const translation = await translationService.createTranslation({
    languageId: 1,
    elementId: 100,
    fieldName: 'title',
    categoryType: 'product',
    value: 'Название продукта',
});
```

### Массовое сохранение переводов (Upsert)

```typescript
// Сохраняет или обновляет переводы для элемента
await translationService.saveTranslations('product', 1, 'name', [
    { languageId: 1, value: 'Product Name' },
    { languageId: 2, value: 'Название продукта' },
]);

// Если перевод с таким ключом существует - он обновится, если нет - создастся
await translationService.saveTranslations('age', 5, 'title', [
    { languageId: 1, value: 'Junior' },
    { languageId: 2, value: 'Младший' },
]);
```

### Удаление переводов

```typescript
// Удалить все переводы для элемента
await translationService.deleteTranslations('product', 1);

// Удалить переводы конкретного поля
await translationService.deleteTranslations('product', 1, 'name');

// Удалить переводы для нескольких элементов (batch)
await translationService.deleteTranslationsBatch('product', [1, 2, 3, 4, 5]);
```

## SQL Схемы

### MySQL

```sql
CREATE TABLE `ozma-language` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Идентификатор',
  `name` varchar(200) NOT NULL COMMENT 'Имя языка',
  `abbreviation` varchar(5) NOT NULL COMMENT 'Аббревиатура языка',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ozma-translation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Идентификатор',
  `languageId` int(11) NOT NULL COMMENT 'Идентификатор языка',
  `categoryType` varchar(20) NOT NULL COMMENT 'Идентификатор типа категории',
  `value` varchar(512) NOT NULL COMMENT 'Текстовое значение',
  `elementId` int NOT NULL COMMENT 'Идентификатор элемента',
  `fieldName` varchar(32) NOT NULL COMMENT 'Название поля',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_languageId_categoryType` (`elementId`, `categoryType`,`fieldName`,`languageId`),
  KEY `FK_languageId` (`languageId`),
  CONSTRAINT `FK_languageId` FOREIGN KEY (`languageId`) REFERENCES `ozma-language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Swagger документация

Модуль включает Swagger декораторы для автоматической документации API. При использовании `@nestjs/swagger` все эндпоинты будут задокументированы.

## Лицензия

MIT

## Автор

Michael Gorbachev
