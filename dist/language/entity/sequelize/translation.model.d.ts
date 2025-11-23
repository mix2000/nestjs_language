import { Model } from 'sequelize-typescript';
import { ITranslation } from '../../interfaces';
export declare class TranslationModel extends Model<TranslationModel> implements ITranslation {
    id: number;
    languageId: number;
    elementId: number;
    fieldName: string;
    categoryType: string;
    value: string;
}
//# sourceMappingURL=translation.model.d.ts.map