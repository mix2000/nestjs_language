# Миграция на v0.0.11

## ⚠️ Breaking Changes

Версия `0.0.11` содержит критическое исправление загрузки зависимостей, но требует изменений в коде.

## Проблема, которую решает эта версия

В версиях до `0.0.11` при импорте пакета загружались **все** зависимости ORM (TypeORM и Sequelize), даже если вы использовали только один из них или вообще не использовали модуль. Это приводило к ошибкам:

```
Error: Cannot find module '@nestjs/typeorm'
```

даже когда вы использовали только Sequelize или вообще не использовали модуль.

## Что изменилось

### Удалены прямые экспорты сервисов

Больше не работает:
```typescript
❌ import { LanguageTypeormService } from 'ozma-nestjs-language';
❌ import { TranslationSequelizeService } from 'ozma-nestjs-language';
❌ import { LanguageEntity } from 'ozma-nestjs-language';
```

## Как мигрировать

### ✅ Правильный способ (через DI токены)

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { ILanguageService, ITranslationService } from 'ozma-nestjs-language';

@Injectable()
export class YourService {
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

### Если действительно нужен прямой доступ к реализации

В редких случаях вам может понадобиться прямой доступ к конкретной реализации:

```typescript
// TypeORM
import { LanguageTypeormService } from 'ozma-nestjs-language/dist/language/service/typeorm/language-typeorm.service';

// Sequelize
import { LanguageSequelizeService } from 'ozma-nestjs-language/dist/language/service/sequelize/language-sequelize.service';
```

## Преимущества новой версии

✅ Загружаются только используемые зависимости  
✅ Нет ошибок при отсутствии неиспользуемых ORM  
✅ Меньший размер bundle  
✅ Быстрее старт приложения  
✅ Правильная архитектура с использованием абстракций

## Пример полной миграции

### Было (v0.0.10):

```typescript
import { Injectable } from '@nestjs/common';
import { LanguageTypeormService } from 'ozma-nestjs-language';

@Injectable()
export class ProductService {
    constructor(
        private languageService: LanguageTypeormService,  // ❌ Прямая зависимость
    ) {}
}
```

### Стало (v0.0.11):

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { ILanguageService } from 'ozma-nestjs-language';

@Injectable()
export class ProductService {
    constructor(
        @Inject('LANGUAGE_SERVICE')
        private languageService: ILanguageService,  // ✅ Через интерфейс
    ) {}
}
```

## Обновление зависимости

### NPM:
```bash
npm install ozma-nestjs-language@0.0.11
```

### GitHub:
```json
{
  "dependencies": {
    "ozma-nestjs-language": "github:mix2000/nestjs_language#v0.0.11"
  }
}
```

## Вопросы?

Создайте issue: https://github.com/mix2000/nestjs_language/issues
