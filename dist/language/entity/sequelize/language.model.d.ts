import { Model } from 'sequelize-typescript';
import { ILanguage } from '../../interfaces';
export declare class LanguageModel extends Model<LanguageModel> implements ILanguage {
    id: number;
    name: string;
    abbreviation: string;
}
//# sourceMappingURL=language.model.d.ts.map