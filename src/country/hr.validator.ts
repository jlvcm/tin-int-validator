import { clearString, digitAt } from '../utils';

const LENGTH = 11;
const PATTERN = /^\d{11}$/;

/**
 * Validate a Croatian TIN.
 * @param tin The Croatian TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateHR(tin: string): boolean {
  const str = clearString(tin);
  if (str.length !== LENGTH) {
    return false;
  }
  if (!PATTERN.test(str)) {
    return false;
  }
  if (!followsRules(str)) {
    return false;
  }
  return true;
}

/**
 * Check if a Croatian TIN follows the Croatia rule.
 * @param tin The Croatian TIN to check.
 * @returns True if the TIN follows the Croatia rule, false otherwise.
 */
export function followsRules(tin: string): boolean {
  // Calculate the sum of the products of the digits and their weights
  let sum = digitAt(tin, 0) + 10;
  let rest = 0;
  for (let i = 1; i < 11; ++i) {
    rest = sum % 10;
    rest = ((rest === 0 ? 10 : rest) * 2) % 11;
    sum = rest + digitAt(tin, i);
  }

  // Calculate the check digit
  const diff = 11 - rest;
  const lastDigit = digitAt(tin, 10);

  // Check if the TIN is valid based on the check digit
  return (rest === 1 && lastDigit === 0) || lastDigit === diff;
}
