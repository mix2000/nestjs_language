import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageEntity } from '../../entity';
import { FilterOptions, ILanguage, ILanguageService } from '../../interfaces';

@Injectable()
export class LanguageTypeormService implements ILanguageService {
    constructor(
        @InjectRepository(LanguageEntity)
        private languageRepository: Repository<LanguageEntity>,
    ) {}

    // LanguageEntity CRUD Operations
    async findAllLanguages(): Promise<LanguageEntity[]> {
        return this.languageRepository.find();
    }

    async findLanguagesByFilter(filter: FilterOptions<ILanguage>): Promise<LanguageEntity[]> {
        return this.languageRepository.find({
            where: filter as any,
        });
    }

    async findLanguageById(id: number): Promise<LanguageEntity> {
        return this.languageRepository.findOneBy({ id });
    }

    async createLanguage(data: { name: string; abbreviation: string }): Promise<LanguageEntity> {
        const language = this.languageRepository.create(data);
        return this.languageRepository.save(language);
    }

    async updateLanguage(id: number, data: { name?: string; abbreviation?: string }): Promise<LanguageEntity> {
        const language = await this.findLanguageById(id);
        this.languageRepository.merge(language, data);
        await this.languageRepository.save(language);

        return language;
    }

    async deleteLanguage(id: number): Promise<void> {
        const language = await this.findLanguageById(id);
        if (language) {
            await this.languageRepository.remove(language);
        }
    }
}
