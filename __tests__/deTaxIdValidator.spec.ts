import { validate, format } from '../src/validator/deTaxIdValidator';
import { InvalidLength, InvalidChecksum } from '../src/exceptions';

describe('deTaxIdValidator', () => {
  it('format:36574261809', () => {
    const result = format('36574261809');

    expect(result).toEqual('36 574 261 809');
  });

  it('validate:36 574 261 809', () => {
    const result = validate('36 574 261 809');

    expect(result.isValid && result.compact).toEqual('36574261809');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:36574261808', () => {
    const result = validate('36574261808');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
