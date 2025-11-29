import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TranslationEntity } from '../../entity/typeorm';
import { FilterOptions, ITranslation, ITranslationService } from '../../interfaces';

@Injectable()
export class TranslationTypeormService implements ITranslationService {
    constructor(
        @InjectRepository(TranslationEntity)
        private translationRepository: Repository<TranslationEntity>,
    ) {}

    async findAllTranslations(): Promise<TranslationEntity[]> {
        return this.translationRepository.find();
    }

    async findTranslationById(id: number): Promise<TranslationEntity> {
        return this.translationRepository.findOneBy({ id });
    }

    async findTranslationByFilter(filter: FilterOptions<ITranslation>): Promise<TranslationEntity[]> {
        return this.translationRepository.find({
            where: filter as any,
        });
    }

    async createTranslation(data: {
        languageId: number;
        categoryType: string;
        value: string;
    }): Promise<TranslationEntity> {
        const translation = this.translationRepository.create(data);
        return this.translationRepository.save(translation);
    }

    async updateTranslation(
        id: number,
        data: { languageId?: number; categoryType?: string; value?: string },
    ): Promise<TranslationEntity> {
        const translation = await this.findTranslationById(id);
        this.translationRepository.merge(translation, data);
        await this.translationRepository.save(translation);

        return translation;
    }

    async deleteTranslation(id: number): Promise<void> {
        const translation = await this.findTranslationById(id);
        if (translation) {
            await this.translationRepository.remove(translation);
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
                return this.translationRepository.upsert(
                    {
                        categoryType,
                        elementId,
                        fieldName,
                        languageId: translation.languageId,
                        value: translation.value,
                    },
                    ['categoryType', 'elementId', 'fieldName', 'languageId'],
                );
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

        await this.translationRepository.delete(conditions);
    }

    async deleteTranslationsBatch(categoryType: string, elementIds: number[]): Promise<void> {
        if (!elementIds || elementIds.length === 0) {
            return;
        }

        await this.translationRepository
            .createQueryBuilder()
            .delete()
            .where('categoryType = :categoryType', { categoryType })
            .andWhere('elementId IN (:...elementIds)', { elementIds })
            .execute();
    }
}
