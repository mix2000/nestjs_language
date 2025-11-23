export interface ILanguage {
    id: number;
    name: string;
    abbreviation: string;
}
export interface ITranslation {
    id: number;
    languageId: number;
    fieldName: string;
    elementId: number;
    categoryType: string;
    value: string;
}
export interface ITranslationData {
    languageId: number;
    value: string;
}
export type FilterOptions<T> = Partial<T> | Partial<T>[];
export interface ILanguageService {
    findLanguagesByFilter(filter: FilterOptions<ILanguage>): Promise<ILanguage[]>;
    findAllLanguages(): Promise<ILanguage[]>;
    findLanguageById(id: number): Promise<ILanguage>;
    createLanguage(data: {
        name: string;
        abbreviation: string;
    }): Promise<ILanguage>;
    updateLanguage(id: number, data: {
        name?: string;
        abbreviation?: string;
    }): Promise<ILanguage>;
    deleteLanguage(id: number): Promise<void>;
}
export interface ITranslationService {
    findTranslationByFilter(filter: FilterOptions<ITranslation>): Promise<ITranslation[]>;
    findAllTranslations(): Promise<ITranslation[]>;
    findTranslationById(id: number): Promise<ITranslation>;
    createTranslation(data: {
        languageId: number;
        categoryType: string;
        value: string;
    }): Promise<ITranslation>;
    updateTranslation(id: number, data: {
        languageId?: number;
        categoryType?: string;
        value?: string;
    }): Promise<ITranslation>;
    deleteTranslation(id: number): Promise<void>;
    /**
     * Сохраняет или обновляет переводы для указанного элемента (upsert)
     * @param categoryType Тип категории
     * @param elementId ID элемента
     * @param fieldName Название поля для перевода
     * @param translations Массив переводов
     */
    saveTranslations(categoryType: string, elementId: number, fieldName: string, translations?: ITranslationData[]): Promise<void>;
    /**
     * Удаляет все переводы для указанного элемента
     * @param categoryType Тип категории
     * @param elementId ID элемента
     * @param fieldName Название поля (опционально)
     */
    deleteTranslations(categoryType: string, elementId: number, fieldName?: string): Promise<void>;
    /**
     * Удаляет переводы для нескольких элементов (batch delete)
     * @param categoryType Тип категории
     * @param elementIds Массив ID элементов
     */
    deleteTranslationsBatch(categoryType: string, elementIds: number[]): Promise<void>;
}
//# sourceMappingURL=interfaces.d.ts.map