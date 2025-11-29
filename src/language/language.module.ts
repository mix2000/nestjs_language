/* eslint-disable @typescript-eslint/no-var-requires */
import { DynamicModule, Module } from '@nestjs/common';
import { LanguageController } from './language.controller';

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
            // Ленивая загрузка TypeORM зависимостей
            let TypeOrmModule: any;
            let LanguageEntity: any;
            let TranslationEntity: any;
            let LanguageTypeormService: any;
            let TranslationTypeormService: any;

            try {
                TypeOrmModule = require('@nestjs/typeorm').TypeOrmModule;
                const entities = require('./entity/typeorm');
                LanguageEntity = entities.LanguageEntity;
                TranslationEntity = entities.TranslationEntity;
                const services = require('./service/typeorm');
                LanguageTypeormService = services.LanguageTypeormService;
                TranslationTypeormService = services.TranslationTypeormService;
            } catch (error) {
                throw new Error(
                    'TypeORM dependencies are not installed. Please install: npm install @nestjs/typeorm typeorm',
                );
            }

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
            // Ленивая загрузка Sequelize зависимостей
            let SequelizeModule: any;
            let LanguageModel: any;
            let TranslationModel: any;
            let LanguageSequelizeService: any;
            let TranslationSequelizeService: any;

            try {
                SequelizeModule = require('@nestjs/sequelize').SequelizeModule;
                const models = require('./entity/sequelize');
                LanguageModel = models.LanguageModel;
                TranslationModel = models.TranslationModel;
                const services = require('./service/sequelize');
                LanguageSequelizeService = services.LanguageSequelizeService;
                TranslationSequelizeService = services.TranslationSequelizeService;
            } catch (error) {
                throw new Error(
                    'Sequelize dependencies are not installed. Please install: npm install @nestjs/sequelize sequelize sequelize-typescript',
                );
            }

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
