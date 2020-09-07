import { Pipe } from '@angular/core';
import { TranslateService } from './service';

@Pipe({ name: 'translateChunk' })
export class TranslateChunkPipe {

  private _translateService: TranslateService;

  constructor(translateService: TranslateService) {
    this._translateService = translateService;
  }


  transform(object: { [key: string]: string | Object }): { [key: string]: string | Object } {
    return this._translateService.translateChunk(object);
  }

}
