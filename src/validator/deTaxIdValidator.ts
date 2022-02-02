import * as exceptions from '../exceptions';
import { splitAt, isDigits, cleanUnicode, iso7064mod10x11validate } from '../utils';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof cleanUnicode> {
  return cleanUnicode(input, ' -./,');
}

const deTaxIdValidator: Validator = {
  /**
   * Convert the number to the minimal representation.
   * This strips the number of any valid separators and removes surrounding
   * whitespace
   * @param {string} input
   * @returns {string | exceptions.InvalidFormat}
   */
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  /**
   * Reformat the number to the standard presentation format.
   * @param {string} input
   * @returns {string}
   */
  format(input: string): string {
    const [value] = clean(input);

    return splitAt(value, 2, 5, 8).join(' ');
  },

  /**
   * Validate with error throws subclass of ValidationError
   * @param {string} input
   * @returns {ValidateReturn}
   */
  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!isDigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (value[0] === '0') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    // In the first 10 digits exactly one digit must be repeated two or
    // three times and other digits can appear only once.
    const counter: Record<number, number> = {};

    value
      .substring(0, 10)
      .split('')
      .map((v) => parseInt(v, 10))
      .forEach((v) => {
        counter[v] = (counter[v] ?? 0) + 1;
      });
    const more = Object.values(counter).filter((v) => v > 1);
    if (more.length !== 1 && [2, 3].includes(more[0])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (!iso7064mod10x11validate(value)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
    };
  },
};

export const { validate, format, compact } = deTaxIdValidator;
