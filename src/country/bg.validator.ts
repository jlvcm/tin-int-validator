import { dateValidate } from '../utils';

const LENGTH = 10;
const PATTERN = /^\d{10}$/;

/**
 * Validate a Bulgarian TIN.
 * @param tin The Bulgarian TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateBG(tin: string): boolean {
  if (tin.length !== LENGTH) {
    return false;
  }
  if (!PATTERN.test(tin) || !isValidDate(tin)) {
    return false;
  }
  if (!followsBulgariaRule(tin)) {
    return false;
  }
  return true;
}

/**
 * Check if a Bulgarian TIN follows the Bulgaria rule.
 * @param tin The Bulgarian TIN to check.
 * @returns True if the TIN follows the Bulgaria rule, false otherwise.
 */
function followsBulgariaRule(tin: string): boolean {
  // Convert the TIN string to an array of digits
  const digits = tin.split('').map(digit => parseInt(digit, 10));

  // Define the weights for each digit position
  const weights = [2, 4, 8, 5, 10, 9, 7, 3, 6];

  // Calculate the sum of the products of each digit and its weight
  const sum = digits.slice(0, 9).reduce((acc, digit, index) => acc + digit * weights[index], 0);

  // Calculate the remainder of the sum divided by 11
  const remainderBy11 = sum % 11;

  // Check if the last digit is valid based on the remainder
  if (remainderBy11 === 10) {
    return digits[9] === 0;
  } else {
    return remainderBy11 === digits[9];
  }
}

/**
 * Validate the date in a Bulgarian TIN.
 * @param tin The Bulgarian TIN to validate.
 * @returns True if the date in the TIN is valid, false otherwise.
 */
function isValidDate(tin: string): boolean {
  try {
    const year = parseInt(tin.substring(0, 2), 10);
    const month = parseInt(tin.substring(2, 4), 10);
    const day = parseInt(tin.substring(4, 6), 10);
    if (month >= 21 && month <= 32) {
      return dateValidate(1800 + year, month - 20, day);
    }
    if (month >= 41 && month <= 52) {
      return dateValidate(2000 + year, month - 40, day);
    }
    return dateValidate(1900 + year, month, day);
  } catch (e) {
    return false;
  }
}
