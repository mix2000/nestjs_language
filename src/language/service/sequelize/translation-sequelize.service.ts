import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TranslationModel } from '../../entity';
import { FilterOptions, ITranslation, ITranslationService } from '../../interfaces';

@Injectable()
export class TranslationSequelizeService implements ITranslationService {
    constructor(
        @InjectModel(TranslationModel)
        private translationModel: typeof TranslationModel,
    ) {}

    async findAllTranslations(): Promise<ITranslation[]> {
        return this.translationModel.findAll();
    }

    async findTranslationById(id: number): Promise<ITranslation> {
        return this.translationModel.findByPk(id);
    }

    async findTranslationByFilter(filter: FilterOptions<ITranslation>): Promise<ITranslation[]> {
        const where = Array.isArray(filter) ? { [Symbol.for('or')]: filter } : filter;
        return this.translationModel.findAll({
            where: where as any,
        });
    }

    async createTranslation(data: { languageId: number; categoryType: string; value: string }): Promise<ITranslation> {
        return this.translationModel.create(data as any);
    }

    async updateTranslation(
        id: number,
        data: { languageId?: number; categoryType?: string; value?: string },
    ): Promise<ITranslation> {
        const translation = await this.findTranslationById(id);
        if (!translation) {
            throw new Error(`Translation with id ${id} not found`);
        }
        await this.translationModel.update(data, {
            where: { id },
        });

        return this.findTranslationById(id);
    }

    async deleteTranslation(id: number): Promise<void> {
        const translation = await this.findTranslationById(id);
        if (translation) {
            await this.translationModel.destroy({
                where: { id },
            });
        }
    }

    async saveTranslations(
        categoryType: string,
        elementId: number,
        fieldName: string,
        translations?: Array<{ languageId: number; value: string }>,
    ): Promise<void> {
        if (!translations || translations.length === 0) {
            return;
        }

        await Promise.all(
            translations.map(async (translation) => {
                return this.translationModel.upsert({
                    categoryType,
                    elementId,
                    fieldName,
                    languageId: translation.languageId,
                    value: translation.value,
                });
            }),
        );
    }

    async deleteTranslations(categoryType: string, elementId: number, fieldName?: string): Promise<void> {
        const conditions: any = {
            categoryType,
            elementId,
        };

        if (fieldName) {
            conditions.fieldName = fieldName;
        }

        await this.translationModel.destroy({
            where: conditions,
        });
    }

    async deleteTranslationsBatch(categoryType: string, elementIds: number[]): Promise<void> {
        if (!elementIds || elementIds.length === 0) {
            return;
        }

        await this.translationModel.destroy({
            where: {
                categoryType,
                elementId: elementIds,
            },
        });
    }
}
