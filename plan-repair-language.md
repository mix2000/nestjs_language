# Исправление пакета ozma-nestjs-language

**Статус**: ✅ Исправлено в v0.0.13

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
    const services = require('./service');  // ← И ЗДЕСЬ
    // ...
} catch (error) {
    throw new Error('Sequelize dependencies are not installed...');
}
```

### Файл 1: `src/language/entity/index.ts`

```typescript
// TypeORM entities
export * from './typeorm/language.entity';      // ← требует typeorm
export * from './typeorm/translation.entity';   // ← требует typeorm
// Sequelize models
export * from './sequelize/language.model';
export * from './sequelize/translation.model';
```

### Файл 2: `src/language/service/index.ts`

```typescript
// TypeORM services
export * from './typeorm/language-typeorm.service';      // ← требует typeorm
export * from './typeorm/translation-typeorm.service';   // ← требует typeorm
// Sequelize services  
export * from './sequelize/language-sequelize.service';
export * from './sequelize/translation-sequelize.service';
```

**При `require('./entity')` или `require('./service')` Node.js загружает ВСЕ экспорты, включая TypeORM файлы которые используют декораторы из `typeorm`.**

## Решение (КОНКРЕТНЫЕ ИЗМЕНЕНИЯ)

### Шаг 1: Создать `src/language/entity/sequelize/index.ts`

```typescript
export * from './language.model';
export * from './translation.model';
```

### Шаг 2: Создать `src/language/entity/typeorm/index.ts`

```typescript
export * from './language.entity';
export * from './translation.entity';
```

### Шаг 3: Создать `src/language/service/sequelize/index.ts`

```typescript
export * from './language-sequelize.service';
export * from './translation-sequelize.service';
```

### Шаг 4: Создать `src/language/service/typeorm/index.ts`

```typescript
export * from './language-typeorm.service';
export * from './translation-typeorm.service';
```

### Шаг 5: Изменить `src/language/language.module.ts`

**Было:**
```typescript
const models = require('./entity');
const services = require('./service');
```

**Стало:**
```typescript
// Для Sequelize:
const models = require('./entity/sequelize');
const services = require('./service/sequelize');

// Для TypeORM:
const models = require('./entity/typeorm');
const services = require('./service/typeorm');
```

### Шаг 6: Удалить или оставить пустыми

- `src/language/entity/index.ts` — НЕ должен экспортировать TypeORM и Sequelize вместе
- `src/language/service/index.ts` — НЕ должен экспортировать TypeORM и Sequelize вместе

Можно оставить только интерфейсы:
```typescript
// entity/index.ts
export * from './sequelize';  // НЕЛЬЗЯ! Это загрузит sequelize
export * from './typeorm';    // НЕЛЬЗЯ! Это загрузит typeorm

// Правильно - вообще убрать этот файл или оставить пустым
```

---

## Тесты после исправления
1. `orm: 'sequelize'` работает БЕЗ установленного typeorm
2. `orm: 'typeorm'` работает БЕЗ установленного sequelize
3. Оба ORM работают когда обе зависимости установлены

## Временный workaround

До исправления пакета, в проекте-потребителе можно установить `typeorm` как devDependency:

```bash
npm install typeorm @nestjs/typeorm --save-dev
```
