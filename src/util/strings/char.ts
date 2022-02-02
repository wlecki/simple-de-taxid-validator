const digitRE = /^[0-9]+$/;

export function isDigits(value: string): boolean {
  return digitRE.test(value);
}
