import { dateValidate, sumDigit } from '../utils';

const LENGTH = 13;
const PATTERN = '(1[89]|20)\\d{2}(0[1-9]|1[012])(0[1-9]|[1-2][0-9]|3[0-1])\\d{5}';
const D: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];
const P: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];
/**
 * Validates a Luxembourg TIN (n° de matricule).
 * @param tin - The TIN to validate.
 * @returns Whether the TIN is valid.
 */
export function validateLU(tin: string): boolean {
  if (!followsLength1(tin)) {
    return false;
  }
  if (!followsPattern1(tin) || !isValidDate(tin)) {
    return false;
  }
  if (!followsRules(tin)) {
    return false;
  }
  return true;
}

/**
 * Checks if a Luxembourg TIN (n° de matricule) follows the rules for Luxembourg TINs.
 * @param tin - The TIN to check.
 * @returns Whether the TIN follows the rules.
 */
function followsRules(tin: string): boolean {
  return followsLuxembourgRule1(tin) && followsLuxembourgRule2(tin);
}

/**
 * Checks if a Luxembourg TIN (n° de matricule) has the correct length.
 * @param tin - The TIN to check.
 * @returns Whether the TIN has the correct length.
 */
function followsLength1(tin: string): boolean {
  return tin.length === LENGTH;
}

/**
 * Checks if a Luxembourg TIN (n° de matricule) follows the first pattern for Luxembourg TINs.
 * @param tin - The TIN to check.
 * @returns Whether the TIN follows the first pattern.
 */
function followsPattern1(tin: string): boolean {
  return new RegExp(PATTERN).test(tin);
}

/**
 * Checks if a Luxembourg TIN (n° de matricule) follows the first pattern for Luxembourg TINs.
 * @param tin - The TIN to check.
 * @returns Whether the TIN follows the first pattern.
 */
function followsLuxembourgRule1(tin: string): boolean {
  const c1 = parseInt(tin.charAt(0));
  const c2 = parseInt(tin.charAt(1));
  const c3 = parseInt(tin.charAt(2));
  const c4 = parseInt(tin.charAt(3));
  const c5 = parseInt(tin.charAt(4));
  const c6 = parseInt(tin.charAt(5));
  const c7 = parseInt(tin.charAt(6));
  const c8 = parseInt(tin.charAt(7));
  const c9 = parseInt(tin.charAt(8));
  const c10 = parseInt(tin.charAt(9));
  const c11 = parseInt(tin.charAt(10));
  const c12 = parseInt(tin.charAt(11));
  try {
    const sum =
      c2 +
      c4 +
      c6 +
      c8 +
      c10 +
      c12 +
      sumDigit(c1 * 2) +
      sumDigit(c3 * 2) +
      sumDigit(c5 * 2) +
      sumDigit(c7 * 2) +
      sumDigit(c9 * 2) +
      sumDigit(c11 * 2);
    const remainderBy10 = sum % 10;
    return remainderBy10 === 0;
  } catch (e) {
    return false;
  }
}

/**
 * Checks if a Luxembourg TIN (n° de matricule) follows the second rule for Luxembourg TINs.
 * @param tin - The TIN to check.
 * @returns Whether the TIN follows the second rule.
 */
function followsLuxembourgRule2(tin: string): boolean {
  const listNumbers: number[] = [];
  for (let i = 12; i >= 0; --i) {
    if (i !== 11) {
      listNumbers.push(parseInt(tin.charAt(i)));
    }
  }
  let check = 0;
  for (let j = 0; j < listNumbers.length; ++j) {
    check = D[check][P[j % 8][listNumbers[j]]];
  }
  return check === 0;
}

/**
 * Checks if a Luxembourg TIN (n° de matricule) has a valid date.
 * @param tin - The TIN to check.
 * @returns Whether the TIN has a valid date.
 */
function isValidDate(tin: string): boolean {
  try {
    const year = parseInt(tin.substring(0, 4));
    const month = parseInt(tin.substring(4, 6));
    const day = parseInt(tin.substring(6, 8));
    return dateValidate(year, month, day);
  } catch (e) {
    return false;
  }
}
