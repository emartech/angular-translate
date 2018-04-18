import { TranslateService } from './service';
import { TranslateChunkPipe } from './translate-chunk.pipe';
import { expect } from 'chai';

describe('TranslateChunkPipe', () => {

  describe('#transform', () => {

    it('should return the given part of the translation', () => {
      const service = new TranslateService({ key: 'something', key2: 'else' });
      const pipe = new TranslateChunkPipe(service);
      expect(pipe.transform({ a: 'key', b: 'key2' })).to.eql({
        a: 'something',
        b: 'else'
      });
    });

    it('should return the given part of the deep translation', () => {
      const service = new TranslateService({ key: 'something',  key2: '[X]', key3: '[Y]' });
      const pipe = new TranslateChunkPipe(service);
      expect(pipe.transform({ a: 'key', b: { c: 'key2', d: 'key3' } })).to.eql({
        a: 'something',
        b: { c: '[X]', d: '[Y]' }
      });
    });

  });

});
