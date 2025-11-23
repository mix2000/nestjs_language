import { Repository } from 'typeorm';
import { TranslationEntity } from '../../entity';
import { FilterOptions, ITranslation, ITranslationService } from '../../interfaces';
export declare class TranslationTypeormService implements ITranslationService {
    private translationRepository;
    constructor(translationRepository: Repository<TranslationEntity>);
    findAllTranslations(): Promise<TranslationEntity[]>;
    findTranslationById(id: number): Promise<TranslationEntity>;
    findTranslationByFilter(filter: FilterOptions<ITranslation>): Promise<TranslationEntity[]>;
    createTranslation(data: {
        languageId: number;
        categoryType: string;
        value: string;
    }): Promise<TranslationEntity>;
    updateTranslation(id: number, data: {
        languageId?: number;
        categoryType?: string;
        value?: string;
    }): Promise<TranslationEntity>;
    deleteTranslation(id: number): Promise<void>;
    saveTranslations(categoryType: string, elementId: number, fieldName: string, translations?: Array<{
        languageId: number;
        value: string;
    }>): Promise<void>;
    deleteTranslations(categoryType: string, elementId: number, fieldName?: string): Promise<void>;
    deleteTranslationsBatch(categoryType: string, elementIds: number[]): Promise<void>;
}
//# sourceMappingURL=translation-typeorm.service.d.ts.map