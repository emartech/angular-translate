import { Injectable, Inject } from '@angular/core';
import { flatten as flattenObject } from 'flat';
import { vsprintf } from 'sprintf-js';

@Injectable()
export class TranslateService {

  constructor(@Inject('translations') private _translations: any) {
    this._translations = flattenObject(_translations);
    this.translate = this.translate.bind(this);
  }


  setTranslations(value: any) {
    this._translations = flattenObject(value);
  }


  hasTranslation(value: string): boolean {
    return !!this._translations[value];
  }


  translate(value: string, parameters: any[] = []): string {
    let translated = (this._translations[value]) ? this._translations[value] : value;
    try {
      return vsprintf(translated, parameters);
    } catch (e) {
      return translated.replace(/%s|%d/gi, '');
    }
  }


  translatePart(key: string, index: number) {
    if (this.hasTranslation(key)) {
      const translatedParts = this._getParts(this._translations[key]);
      return translatedParts.length > index ?
        translatedParts[index] :
        this._getDefaultForPart(key, index);
    } else {
      return this._getDefaultForPart(key, index);
    }
  }


  translateChunk(object: { [key: string]: string | Object }): { [key: string]: string | Object } {
    return Object.keys(object).reduce((translated, key) => {
      return Object.assign({}, translated, { [key]: this._deepTranslate(object[key]) });
    }, {});
  }


  private _deepTranslate(value: string | Object): string | Object {
    return typeof value === 'string' ? this.translate(value) : this.translateChunk(value as any);
  }


  private _getParts(text: string) {
    return text.split(/%s|%d/gi)
  }


  private _getDefault(key: string) {
    return key.replace(/%s|%d/gi, '');
  }


  private _getDefaultForPart(key: string, index: number) {
    return `${this._getDefault(key)}[${index}]`;
  }

}
