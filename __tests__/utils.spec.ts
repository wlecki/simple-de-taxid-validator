import { splitAt, cleanUnicode, iso7064mod10x11validate } from '../src/utils';

describe('clean', () => {
  it('basic', () => {
    expect(cleanUnicode('123', '2')[0]).toEqual('13');
  });

  it('unicode-9', () => {
    expect(cleanUnicode('\u{1D7FF}9')[0]).toEqual('99');
  });

  it('simple whitespace', () => {
    expect(cleanUnicode('8\t\xA08')[0]).toEqual('88');
  });
});

describe('iso7064', () => {
  describe('iso7064mod10x11validate', () => {
    it('794623', () => {
      expect(iso7064mod10x11validate('794623')).toEqual(true);
    });

    it('002006673085', () => {
      expect(iso7064mod10x11validate('002006673085')).toEqual(true);
    });

    it('00200667308', () => {
      expect(iso7064mod10x11validate('00200667308')).toEqual(false);
    });
  });
});

describe('splitAt', () => {
  it('basic', () => {
    expect(splitAt('abcdefghij', 3, 6)).toEqual(['abc', 'def', 'ghij']);
  });

  it('negative', () => {
    expect(splitAt('abcdefghij', -6, -3)).toEqual(['abcd', 'efg', 'hij']);
  });

  it('short', () => {
    expect(splitAt('abc', 3)).toEqual(['abc']);
  });
});
