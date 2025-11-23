import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ITranslation } from '../../interfaces';
import { LanguageModel } from './language.model';

@Table({
    tableName: 'ozma-translation',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['categoryType', 'elementId', 'languageId', 'fieldName'],
        },
    ],
})
export class TranslationModel extends Model<TranslationModel> implements ITranslation {
    @PrimaryKey
    @AutoIncrement
    @Column({
        comment: 'Идентификатор',
        type: DataType.INTEGER,
        allowNull: false,
    })
    id!: number;

    @ForeignKey(() => LanguageModel)
    @Column({
        comment: 'Идентификатор языка',
        type: DataType.INTEGER,
        allowNull: false,
    })
    languageId: number;

    @Column({
        comment: 'Идентификатор элемента',
        type: DataType.INTEGER,
        allowNull: false,
    })
    elementId: number;

    @Column({
        comment: 'Название поля',
        type: DataType.STRING(32),
        allowNull: false,
    })
    fieldName: string;

    @Column({
        comment: 'Идентификатор категории',
        type: DataType.STRING(20),
        allowNull: false,
    })
    categoryType: string;

    @Column({
        comment: 'Текстовое значение',
        type: DataType.STRING(512),
        allowNull: false,
    })
    value: string;
}
