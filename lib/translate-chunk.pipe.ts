import { Pipe } from '@angular/core';
import { TranslateService } from './service';

@Pipe({ name: 'translatePart' })
export class TranslateChunkPipe {

  private _translateService: TranslateService;

  constructor(translateService: TranslateService) {
    this._translateService = translateService;
  }


  transform(object: { [key: string]: string }): { [key: string]: string } {
    return this._translateService.translateChunk(object);
  }

}
