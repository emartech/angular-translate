import { Pipe } from '@angular/core';
import { TranslateService } from './service';

@Pipe({ name: 'translatePart' })
export class TranslatePartPipe {

  private _translateService: TranslateService;

  constructor(translateService: TranslateService) {
    this._translateService = translateService;
  }


  transform(key: string, part: number): string {
    return this._translateService.translatePart(key, part);
  }

}
