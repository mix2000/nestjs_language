import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LanguageModel } from '../../entity';
import { FilterOptions, ILanguage, ILanguageService } from '../../interfaces';

@Injectable()
export class LanguageSequelizeService implements ILanguageService {
    constructor(
        @InjectModel(LanguageModel)
        private languageModel: typeof LanguageModel,
    ) {}

    async findAllLanguages(): Promise<ILanguage[]> {
        return this.languageModel.findAll();
    }

    async findLanguagesByFilter(filter: FilterOptions<ILanguage>): Promise<ILanguage[]> {
        const where = Array.isArray(filter) ? { [Symbol.for('or')]: filter } : filter;
        return this.languageModel.findAll({
            where: where as any,
        });
    }

    async findLanguageById(id: number): Promise<ILanguage> {
        return this.languageModel.findByPk(id);
    }

    async createLanguage(data: { name: string; abbreviation: string }): Promise<ILanguage> {
        return this.languageModel.create(data);
    }

    async updateLanguage(id: number, data: { name?: string; abbreviation?: string }): Promise<ILanguage> {
        const language = await this.findLanguageById(id);
        if (!language) {
            throw new Error(`Language with id ${id} not found`);
        }
        await this.languageModel.update(data, {
            where: { id },
        });

        return this.findLanguageById(id);
    }

    async deleteLanguage(id: number): Promise<void> {
        const language = await this.findLanguageById(id);
        if (language) {
            await this.languageModel.destroy({
                where: { id },
            });
        }
    }
}
