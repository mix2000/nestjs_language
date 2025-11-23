import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ILanguage } from '../../interfaces';

@Table({
    tableName: 'ozma-language',
    timestamps: false,
})
export class LanguageModel extends Model<LanguageModel> implements ILanguage {
    @PrimaryKey
    @AutoIncrement
    @Column({
        comment: 'Идентификатор',
        type: DataType.INTEGER,
        allowNull: false,
    })
    id!: number;

    @Column({
        comment: 'Имя языка',
        type: DataType.STRING(200),
        allowNull: false,
    })
    name: string;

    @Column({
        comment: 'Аббревиатура языка',
        type: DataType.STRING(5),
        allowNull: false,
    })
    abbreviation: string;
}
