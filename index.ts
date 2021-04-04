export * from './lib';
import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import {
  TranslatePipe,
  TranslatePartPipe,
  TranslateChunkPipe,
  TranslateService,
} from './lib';

export type Translations = {
  [name: string]: string;
};

export function translationsFactory() {
  return {};
}

@NgModule({
  declarations: [TranslatePipe, TranslatePartPipe, TranslateChunkPipe],
  exports: [TranslatePipe, TranslatePartPipe, TranslateChunkPipe],
})
export class TranslateModule {
  static forRoot(
    providedTranslations: Provider = {
      provide: 'translations',
      useFactory: translationsFactory,
    }
  ): ModuleWithProviders<TranslateModule> {
    return {
      ngModule: TranslateModule,
      providers: [TranslateService, providedTranslations],
    };
  }
}
