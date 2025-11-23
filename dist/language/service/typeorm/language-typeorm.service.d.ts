import { Repository } from 'typeorm';
import { LanguageEntity } from '../../entity';
import { FilterOptions, ILanguage, ILanguageService } from '../../interfaces';
export declare class LanguageTypeormService implements ILanguageService {
    private languageRepository;
    constructor(languageRepository: Repository<LanguageEntity>);
    findAllLanguages(): Promise<LanguageEntity[]>;
    findLanguagesByFilter(filter: FilterOptions<ILanguage>): Promise<LanguageEntity[]>;
    findLanguageById(id: number): Promise<LanguageEntity>;
    createLanguage(data: {
        name: string;
        abbreviation: string;
    }): Promise<LanguageEntity>;
    updateLanguage(id: number, data: {
        name?: string;
        abbreviation?: string;
    }): Promise<LanguageEntity>;
    deleteLanguage(id: number): Promise<void>;
}
//# sourceMappingURL=language-typeorm.service.d.ts.map