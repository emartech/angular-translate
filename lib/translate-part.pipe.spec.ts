import { TranslateService } from './service';
import { TranslatePartPipe } from './translate-part.pipe';
import { expect } from 'chai';

describe('TranslatePartPipe', () => {

  describe('#transform', () => {

    it('should return the given part of the translation', () => {
      const service = new TranslateService({ key: { innerKey: 'value0 %s value1 %d value2 %s value3' } });
      const pipe = new TranslatePartPipe(service);
      expect(pipe.transform('key.innerKey', 2)).to.eql(' value2 ');
    });

  });

});
