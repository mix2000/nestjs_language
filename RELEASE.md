# Release Guide v0.0.8

## ✅ Релиз подготовлен!

### Что сделано:
- ✅ Версия обновлена до **0.0.8** в package.json
- ✅ Добавлено описание и метаданные пакета
- ✅ Создан файл LICENSE (MIT)
- ✅ Git коммит создан
- ✅ Git тег **v0.0.8** создан
- ✅ Проект собран (npm run build)

## 📦 Как опубликовать в NPM

### 1. Отправить изменения в GitHub

```bash
# Отправить коммиты
git push origin main

# Отправить тег
git push origin v0.0.8
```

### 2. Публикация в NPM

```bash
# Войти в NPM (если еще не вошли)
npm login

# Опубликовать пакет
npm publish

# Или для scoped пакета
npm publish --access public
```

### 3. Проверка после публикации

```bash
# Проверить что пакет опубликован
npm view ozma-nestjs-language

# Установить пакет для проверки
npm install ozma-nestjs-language@0.0.8
```

## 📝 Что включено в релиз

### Файлы для публикации (указаны в package.json):
- `dist/` - скомпилированный код
- `README.md` - документация
- `CHANGELOG.md` - история изменений
- `LICENSE` - лицензия MIT

### Новые возможности v0.0.8:

1. **saveTranslations()** - массовое сохранение/обновление переводов
   ```typescript
   await service.saveTranslations('product', 1, 'name', [
       { languageId: 1, value: 'Product' },
       { languageId: 2, value: 'Продукт' }
   ]);
   ```

2. **deleteTranslations()** - удаление переводов элемента
   ```typescript
   await service.deleteTranslations('product', 1);
   await service.deleteTranslations('product', 1, 'name'); // только поле name
   ```

3. **deleteTranslationsBatch()** - пакетное удаление
   ```typescript
   await service.deleteTranslationsBatch('product', [1, 2, 3, 4, 5]);
   ```

4. **Полная поддержка Sequelize-TypeScript** наравне с TypeORM

## 🔗 Полезные ссылки

- GitHub: https://github.com/mix2000/nestjs_language
- NPM: https://www.npmjs.com/package/ozma-nestjs-language
- Issues: https://github.com/mix2000/nestjs_language/issues

## 📊 Статистика

- Версия: **0.0.8**
- Node.js: **>=18.12.0**
- TypeScript: **^5.1.3**
- Поддерживаемые ORM: TypeORM, Sequelize

## ⚠️ Важно

Перед публикацией убедитесь что:
- ✅ Вы авторизованы в NPM (`npm whoami`)
- ✅ У вас есть права на публикацию пакета
- ✅ Версия в package.json уникальна (0.0.8 еще не опубликована)
- ✅ Проект успешно собирается (`npm run build`)
- ✅ Линтер не выдает ошибок (`npm run lint`)

## 🎉 После публикации

Обновите README.md на GitHub с бейджами:

```markdown
[![npm version](https://badge.fury.io/js/ozma-nestjs-language.svg)](https://www.npmjs.com/package/ozma-nestjs-language)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

Анонсируйте релиз в:
- GitHub Releases
- Twitter/LinkedIn (если актуально)
- NestJS сообщество
