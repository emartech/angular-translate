import { Pipe } from '@angular/core';
import { TranslateService } from './service';

@Pipe({ name: 'translateChunk' })
export class TranslateChunkPipe {


  constructor(private _translateService: TranslateService) {}

  transform(object: { [key: string]: string | Object }): { [key: string]: string | Object } {
    return this._translateService.translateChunk(object);
  }

}
