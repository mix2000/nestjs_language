import { TranslationModel } from '../../entity/sequelize';
import { FilterOptions, ITranslation, ITranslationService } from '../../interfaces';
export declare class TranslationSequelizeService implements ITranslationService {
    private translationModel;
    constructor(translationModel: typeof TranslationModel);
    findAllTranslations(): Promise<ITranslation[]>;
    findTranslationById(id: number): Promise<ITranslation>;
    findTranslationByFilter(filter: FilterOptions<ITranslation>): Promise<ITranslation[]>;
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
    saveTranslations(categoryType: string, elementId: number, fieldName: string, translations?: Array<{
        languageId: number;
        value: string;
    }>): Promise<void>;
    deleteTranslations(categoryType: string, elementId: number, fieldName?: string): Promise<void>;
    deleteTranslationsBatch(categoryType: string, elementIds: number[]): Promise<void>;
}
//# sourceMappingURL=translation-sequelize.service.d.ts.map