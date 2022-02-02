import * as exceptions from './exceptions';
import { mapped } from './map';

export function iso7064mod10x11validate(value: string): boolean {
  const check = value
    .split('')
    .map((v) => parseInt(v, 10))
    .reduce((acc, v) => ((((acc === 0 ? 10 : acc) * 2) % 11) + v) % 10, 5);

  return check === 1;
}

export function isDigits(value: string): boolean {
  const digitRE = /^[0-9]+$/;
  return digitRE.test(value);
}

/**
 * split a string at the given indexes
 *
 * e.g. splitAt('abcdefghijklmnop', 3, 6, 9) => ['abc', 'def', 'ghijklmonop']
 */
export function splitAt(value: string, ...points: number[]): string[] {
  const parts = [0, ...points].map((p, idx) => {
    const nvalue = idx >= points.length ? value.length : points[idx];
    const np = nvalue < 0 ? value.length + nvalue : nvalue;
    const pp = p < 0 ? value.length + p : p;

    return value.substr(pp, np - pp);
  });

  return parts.filter((v) => v.length !== 0);
}

/**
 * Clean up visually similar unicode values, by default
 * trim whitespace
 */
export function cleanUnicode(
  value: string,
  deletechars = ' ',
  stripPrefix?: string,
): [string, exceptions.InvalidFormat | null] {
  if (typeof value !== 'string') {
    return ['', new exceptions.InvalidFormat()];
  }

  // Don't use value.split("") -- doesn't work for "high" unicode
  const cleaned = [...value]
    .map((c) => mapped[c] ?? c)
    .filter((c) => !deletechars.includes(c))
    .join('')
    .toLocaleUpperCase();

  if (stripPrefix && cleaned.startsWith(stripPrefix)) {
    return [cleaned.substr(stripPrefix.length), null];
  }
  return [cleaned, null];
}
