import { DynamicModule } from '@nestjs/common';
export interface LanguageModuleOptions {
    orm: 'typeorm' | 'sequelize';
}
export declare class LanguageModule {
    static forRoot(options: LanguageModuleOptions): DynamicModule;
}
//# sourceMappingURL=language.module.d.ts.map