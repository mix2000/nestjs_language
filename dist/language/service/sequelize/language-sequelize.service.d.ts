import { LanguageModel } from '../../entity';
import { FilterOptions, ILanguage, ILanguageService } from '../../interfaces';
export declare class LanguageSequelizeService implements ILanguageService {
    private languageModel;
    constructor(languageModel: typeof LanguageModel);
    findAllLanguages(): Promise<ILanguage[]>;
    findLanguagesByFilter(filter: FilterOptions<ILanguage>): Promise<ILanguage[]>;
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
//# sourceMappingURL=language-sequelize.service.d.ts.map