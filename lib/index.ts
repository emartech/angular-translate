export * from './service';
export * from './pipe';
import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { TranslatePipe } from './pipe';
import { TranslateService } from './service';

export type Translations = {
  [name: string]: string
};

export function translationsFactory() { return {}; }

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe]
})
export class TranslateModule {
  static forRoot(
    providedTranslations: Provider = { provide: 'translations', useFactory: translationsFactory }
  ): ModuleWithProviders {
    return {
      ngModule: TranslateModule,
      providers: [TranslateService, providedTranslations]
    };
  }
}
