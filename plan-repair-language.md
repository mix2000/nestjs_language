# Исправление пакета ozma-nestjs-language

## Проблема

При использовании `LanguageModule.forRoot({ orm: 'sequelize' })` приложение падает с ошибкой:

```
Error: Sequelize dependencies are not installed. Please install: npm install @nestjs/sequelize sequelize sequelize-typescript
```

Хотя все Sequelize зависимости установлены.

## Причина

В файле `language.module.ts` (строки 55-66):

```typescript
try {
    SequelizeModule = require('@nestjs/sequelize').SequelizeModule;
    const models = require('./entity');  // ← ПРОБЛЕМА ЗДЕСЬ
    LanguageModel = models.LanguageModel;
    TranslationModel = models.TranslationModel;
    // ...
} catch (error) {
    throw new Error('Sequelize dependencies are not installed...');
}
```

Файл `entity/index.ts` экспортирует ВСЕ модели:

```typescript
// TypeORM entities
export * from './typeorm/language.entity';      // ← требует typeorm
export * from './typeorm/translation.entity';   // ← требует typeorm
// Sequelize models
export * from './sequelize/language.model';
export * from './sequelize/translation.model';
```

При `require('./entity')` Node.js загружает TypeORM entities, которые используют декораторы из `typeorm`. Если `typeorm` не установлен — падает ошибка. Но catch блок выбрасывает неправильное сообщение про Sequelize.

## Решение

### Вариант 1: Раздельные экспорты (рекомендуется)

Создать отдельные файлы экспорта:

**`entity/sequelize/index.ts`**:
```typescript
export * from './language.model';
export * from './translation.model';
```

**`entity/typeorm/index.ts`**:
```typescript
export * from './language.entity';
export * from './translation.entity';
```

**`language.module.ts`** — импортировать напрямую:
```typescript
// Для Sequelize
const { LanguageModel, TranslationModel } = require('./entity/sequelize');

// Для TypeORM
const { LanguageEntity, TranslationEntity } = require('./entity/typeorm');
```

### Вариант 2: Динамический импорт с проверкой

```typescript
if (options.orm === 'sequelize') {
    try {
        SequelizeModule = require('@nestjs/sequelize').SequelizeModule;
    } catch {
        throw new Error('@nestjs/sequelize is not installed');
    }
    
    try {
        const { LanguageModel, TranslationModel } = require('./entity/sequelize');
        // ...
    } catch (e) {
        throw new Error(`Failed to load Sequelize models: ${e.message}`);
    }
}
```

### Вариант 3: Удалить общий entity/index.ts

Убрать файл `entity/index.ts` полностью и импортировать модели напрямую из подпапок.

## Дополнительно

Аналогичная проблема может быть в `service/index.ts` — нужно проверить и исправить таким же образом.

## Тесты

После исправления проверить:
1. `orm: 'sequelize'` работает БЕЗ установленного typeorm
2. `orm: 'typeorm'` работает БЕЗ установленного sequelize
3. Оба ORM работают когда обе зависимости установлены

## Временный workaround

До исправления пакета, в проекте-потребителе можно установить `typeorm` как devDependency:

```bash
npm install typeorm @nestjs/typeorm --save-dev
```
