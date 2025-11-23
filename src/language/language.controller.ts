import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ILanguage, ILanguageService } from './interfaces';
import {
    SwaggerCreateLanguage,
    SwaggerDeleteLanguage,
    SwaggerFindAllLanguages,
    SwaggerFindLanguageById,
    SwaggerUpdateLanguage,
} from './swagger';

@Controller('languages')
export class LanguageController {
    constructor(@Inject('LANGUAGE_SERVICE') private languageService: ILanguageService) {}

    @Get()
    @SwaggerFindAllLanguages()
    async findAll(): Promise<ILanguage[]> {
        return this.languageService.findAllLanguages();
    }

    @Get(':id')
    @SwaggerFindLanguageById()
    async findOne(@Param('id') id: string): Promise<ILanguage> {
        return this.languageService.findLanguageById(+id);
    }

    @Post()
    @SwaggerCreateLanguage()
    async create(@Body() languageData: { name: string; abbreviation: string }): Promise<ILanguage> {
        return this.languageService.createLanguage(languageData);
    }

    @Put(':id')
    @SwaggerUpdateLanguage()
    async update(@Param('id') id: string, @Body() languageData: { name?: string; abbreviation?: string }) {
        return this.languageService.updateLanguage(+id, languageData);
    }

    @Delete(':id')
    @SwaggerDeleteLanguage()
    async delete(@Param('id') id: string) {
        return this.languageService.deleteLanguage(+id);
    }
}
