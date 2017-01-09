export * from './lib/service';
export * from './lib/pipe';
import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { TranslatePipe } from './lib/pipe';
import { TranslateService } from './lib/service';

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
