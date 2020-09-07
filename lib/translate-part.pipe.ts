import { Pipe } from '@angular/core';
import { TranslateService } from './service';

@Pipe({ name: 'translatePart' })
export class TranslatePartPipe {

  constructor(private _translateService: TranslateService) {}

  transform(key: string, part: number): string {
    return this._translateService.translatePart(key, part);
  }

}
