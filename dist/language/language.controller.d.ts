import { ILanguage, ILanguageService } from './interfaces';
export declare class LanguageController {
    private languageService;
    constructor(languageService: ILanguageService);
    findAll(): Promise<ILanguage[]>;
    findOne(id: string): Promise<ILanguage>;
    create(languageData: {
        name: string;
        abbreviation: string;
    }): Promise<ILanguage>;
    update(id: string, languageData: {
        name?: string;
        abbreviation?: string;
    }): Promise<ILanguage>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=language.controller.d.ts.map