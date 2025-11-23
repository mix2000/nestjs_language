import { DynamicModule, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity, LanguageModel, TranslationEntity, TranslationModel } from './entity';
import { LanguageController } from './language.controller';
import {
    LanguageSequelizeService,
    LanguageTypeormService,
    TranslationSequelizeService,
    TranslationTypeormService,
} from './service';

export interface LanguageModuleOptions {
    orm: 'typeorm' | 'sequelize';
}

@Module({})
export class LanguageModule {
    static forRoot(options: LanguageModuleOptions): DynamicModule {
        const imports = [];
        const providers = [];
        const exports = [];

        if (options.orm === 'typeorm') {
            imports.push(TypeOrmModule.forFeature([LanguageEntity, TranslationEntity]));
            providers.push(
                {
                    provide: 'LANGUAGE_SERVICE',
                    useClass: LanguageTypeormService,
                },
                {
                    provide: 'TRANSLATION_SERVICE',
                    useClass: TranslationTypeormService,
                },
                LanguageTypeormService,
                TranslationTypeormService,
            );
            exports.push(LanguageTypeormService, TranslationTypeormService, 'LANGUAGE_SERVICE', 'TRANSLATION_SERVICE');
        } else if (options.orm === 'sequelize') {
            imports.push(SequelizeModule.forFeature([LanguageModel, TranslationModel]));
            providers.push(
                {
                    provide: 'LANGUAGE_SERVICE',
                    useClass: LanguageSequelizeService,
                },
                {
                    provide: 'TRANSLATION_SERVICE',
                    useClass: TranslationSequelizeService,
                },
                LanguageSequelizeService,
                TranslationSequelizeService,
            );
            exports.push(
                LanguageSequelizeService,
                TranslationSequelizeService,
                'LANGUAGE_SERVICE',
                'TRANSLATION_SERVICE',
            );
        }

        return {
            module: LanguageModule,
            imports,
            controllers: [LanguageController],
            providers,
            exports,
        };
    }
}
