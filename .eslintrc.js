module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'import'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js', 'dist', 'example.ts'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        "import/order": ["error", {
            "alphabetize": {
                "order": "asc", // или "desc" для обратной сортировки
            },
            "newlines-between": "never", // чтобы были новые строки между внешними и внутренними зависимостями
        }],
        "import/first": "error", // Все импорты должны быть в начале файла
        "import/newline-after-import": "error", // Пустая строка после последнего импорта
        "import/no-duplicates": "error", // Нет дубликатов импорта
        'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: false}],
        'prettier/prettier': ['error', {printWidth: 120, "tabWidth": 4}],
    },
};
