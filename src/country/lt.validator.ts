import { dateValidate } from '../utils';

/**
 * Validate a Lithuanian TIN.
 * @param tin The Lithuanian TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateLT(tin: string): boolean {
  if (!followsLength(tin)) {
    return false;
  }
  if (!followsPattern(tin)) {
    return false;
  }
  if (!followsRules(tin)) {
    return false;
  }
  return true;
}

/**
 * Check if the month in a Lithuanian TIN is valid.
 * @param tin The Lithuanian TIN to check.
 * @returns True if the month is valid, false otherwise.
 */
function checkMonth(tin: string): boolean {
  const month = parseInt(tin.substring(3, 5), 10);
  return month > 0 && month < 13;
}

/**
 * Check if the day in a Lithuanian TIN is valid.
 * @param tin The Lithuanian TIN to check.
 * @returns True if the day is valid, false otherwise.
 */
function checkDay(tin: string): boolean {
  const day = parseInt(tin.substring(5, 7), 10);
  return day > 0 && day < 32;
}

/**
 * Check if a Lithuanian TIN follows the length rule.
 * @param tin The Lithuanian TIN to check.
 * @returns True if the TIN follows the length rule, false otherwise.
 */
function followsLength(tin: string): boolean {
  return tin.length === 11;
}

/**
 * Check if a Lithuanian TIN follows the pattern rule.
 * @param tin The Lithuanian TIN to check.
 * @returns True if the TIN follows the pattern rule, false otherwise.
 */
function followsPattern(tin: string): boolean {
  const pattern = /^[1-6]\d{2}[0-1]\d[0-3]\d{5}$/;
  return pattern.test(tin) && checkMonth(tin) && checkDay(tin) && isValidDate(tin);
}

/**
 * Check if a Lithuanian TIN follows the Lithuania rule.
 * @param tin The Lithuanian TIN to check.
 * @returns True if the TIN follows the Lithuania rule, false otherwise.
 */
function followsRules(tin: string): boolean {
  let sum = 0;
  const c11 = parseInt(tin.substring(10), 10);
  for (let i = 0; i < 10; i++) {
    sum += multiplyAccordingToWeight(parseInt(tin.substring(i, i + 1), 10), i);
  }
  let remainderBy11 = sum % 11;
  if (remainderBy11 !== 10) {
    return c11 === remainderBy11;
  }
  let sum2 = 0;
  for (let j = 0; j < 10; j++) {
    sum2 += multiplyAccordingToWeight2(parseInt(tin.substring(j, j + 1), 10), j);
  }
  remainderBy11 = sum2 % 11;
  if (remainderBy11 === 10) {
    return c11 === 0;
  }
  return c11 === remainderBy11;
}

/**
 * Multiply a number according to its weight.
 * @param val The number to multiply.
 * @param index The index of the number.
 * @returns The multiplied number.
 */
function multiplyAccordingToWeight(val: number, index: number): number {
  switch (index) {
    case 0:
      return val * 1;
    case 1:
      return val * 2;
    case 2:
      return val * 3;
    case 3:
      return val * 4;
    case 4:
      return val * 5;
    case 5:
      return val * 6;
    case 6:
      return val * 7;
    case 7:
      return val * 8;
    case 8:
      return val * 9;
    case 9:
      return val * 1;
    default:
      return -1;
  }
}

/**
 * Multiply a number according to its weight.
 * @param val The number to multiply.
 * @param index The index of the number.
 * @returns The multiplied number.
 */
function multiplyAccordingToWeight2(val: number, index: number): number {
  switch (index) {
    case 0:
      return val * 3;
    case 1:
      return val * 4;
    case 2:
      return val * 5;
    case 3:
      return val * 6;
    case 4:
      return val * 7;
    case 5:
      return val * 8;
    case 6:
      return val * 9;
    case 7:
      return val * 1;
    case 8:
      return val * 2;
    case 9:
      return val * 3;
    default:
      return -1;
  }
}

/**
 * Check if a date is valid.
 * @param tin The Lithuanian TIN to check the date of.
 * @returns True if the date is valid, false otherwise.
 */
export function isValidDate(tin: string): boolean {
  try {
    const day = parseInt(tin.substring(5, 7), 10);
    const month = parseInt(tin.substring(3, 5), 10);
    const year = parseInt(tin.substring(1, 3), 10);
    return dateValidate(1900 + year, month, day) || dateValidate(2000 + year, month, day);
  } catch (e) {
    return false;
  }
}
