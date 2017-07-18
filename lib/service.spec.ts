import { expect } from 'chai';
import { TranslateService } from './service';

describe('service', () => {

  const createService = function(translations: any) {
    return new TranslateService(translations);
  };

  describe('#hasTranslation', () => {

    it('should give back false if there is no translation for it', () => {
      const service = createService({ key: 'value' });
      expect(service.hasTranslation('notExists')).to.eql(false);
    });


    it('should give back true if there is translation for it', () => {
      const service = createService({ what: 'val' });
      expect(service.hasTranslation('what')).to.eql(true);
    });

  });

  describe('#translate', () => {

    it('should translate the given simple text', () => {
      const service = createService({ key: 'value' });
      expect(service.translate('key')).to.eql('value');
    });


    it('should give back the given text if there is no translation for it', () => {
      const service = createService({ key: 'value' });
      expect(service.translate('wrongKey')).to.eql('wrongKey');
    });


    it('should give back the given text with interpolation', () => {
      const service = createService({ key: '%s value %s' });
      expect(service.translate('key', ['a', 'b'])).to.eql('a value b');
    });


    it('should handle nested dictionary', () => {
      const service = createService({ root: { nested: 'value' } });
      expect(service.translate('root.nested')).to.eql('value');
    });


    it('should give back the given text with interpolation if there is no translation for it', () => {
      const service = createService({ key: 'value' });
      expect(service.translate('%s wrongKey %s', ['a', 'b'])).to.eql('a wrongKey b');
    });


    it('should remove the interpolation places if they are not match for the expectations', () => {
      const service = createService({ key: '%s value %d' });
      expect(service.translate('key', ['string', 'expects for decimal'])).to.eql(' value ');
    });


    it('should always run in the service context', () => {
      const service = createService({ key: 'value' });
      expect(service.translate.call(null, 'key')).to.eql('value');
    });

  });

  describe('#setTranslations', () => {

    it('should override the initial translations', () => {
      const service = createService({ key: 'value' });
      service.setTranslations({ otherKey: 'value' });

      expect(service.translate('key')).to.eql('key');
      expect(service.translate('otherKey')).to.eql('value');
    });

  });

  describe('#translatePart', () => {

    it('should return the whole translation if there is no delimiter and the 0th part is requested', () => {
      const service = createService({ key: 'value' });
      expect(service.translatePart('key', 0)).to.eql('value');
    });


    it('should return the zero-based nth part using %s as delimiter', () => {
      const service = createService({ key: 'value0 %s value1' });
      expect(service.translatePart('key', 1)).to.eql(' value1');
    });


    it('should use %d too as delimiter', () => {
      const service = createService({ key: 'value0 %d value1' });
      expect(service.translatePart('key', 1)).to.eql(' value1');
    });


    it('should handle strings where both %s and %d is used', () => {
      const service = createService({ key: 'value0 %s value1 %d value2 %s value3' });
      expect(service.translatePart('key', 2)).to.eql(' value2 ');
    });


    it('should handle nested objects', () => {
      const service = createService({ key: { innerKey: 'value0 %s value1 %d value2 %s value3' } });
      expect(service.translatePart('key.innerKey', 2)).to.eql(' value2 ');
    });


    it('should fall back to the key and the given index in brackets if there are not enough parts', () => {
      const service = createService({ key: { innerKey: 'value0 %s value1 %d value2 %s value3' } });
      expect(service.translatePart('key.innerKey', 4)).to.eql('key.innerKey[4]');
    });


    it('should fall back to the key and the given index in brackets if the key does not exist', () => {
      const service = createService({ key: { innerKey: 'value0 %s value1 %d value2 %s value3' } });
      expect(service.translatePart('key.innerKey2', 1)).to.eql('key.innerKey2[1]');
    });

  });

});


