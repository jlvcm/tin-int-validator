import { getLastDayOfMonth } from '../utils';

const LENGTH = 10;
const PATTERN = /^[0-3]\d[0-1]\d{3}\d{4}$/;

/**
 * Validates a Danish TIN (CPR or CVR number).
 * @param tin - The TIN to validate.
 * @returns Whether the TIN is valid.
 */
export function validateDK(tin: string): boolean {
  const withoutHyphen = tin.replace(/-/g, '');
  if (withoutHyphen.length !== LENGTH) {
    return false;
  }
  if (!PATTERN.test(withoutHyphen) || !isValidDate(withoutHyphen)) {
    return false;
  }
  if (!followsRules(withoutHyphen)) {
    return false;
  }
  return true;
}

/**
 * Checks if a Danish TIN (CPR or CVR number) follows the rules for Danish TINs.
 * @param tin - The TIN to check.
 * @returns Whether the TIN follows the rules.
 */
function followsRules(tin: string): boolean {
  return followsDenmarkRule(tin);
}

/**
 * Checks if a Danish TIN (CPR or CVR number) follows the rules for Danish TINs.
 * @param {string} tin - The TIN to check.
 * @returns {boolean} Whether the TIN follows the rules.
 */
function followsDenmarkRule(tin: string): boolean {
  // Extract the serial number and year of birth from the TIN
  const serialNumber = parseInt(tin.substring(6, 10), 10);
  const yearOfBirth = parseInt(tin.substring(4, 6), 10);

  // Check if the TIN is a CPR number and follows the rules for CPR numbers
  if (yearOfBirth >= 37 && yearOfBirth <= 57 && serialNumber >= 5000 && serialNumber <= 8999) {
    return false;
  }

  // Convert the TIN string to an array of digits
  const digits = tin.split('').map(char => parseInt(char, 10));

  // Define the weights for each digit
  const weights = [4, 3, 2, 7, 6, 5, 4, 3, 2];

  // Calculate the sum of the products of the digits and their weights
  const sum = digits.reduce((acc, digit, index) => acc + digit * (weights[index] || 0), 0);

  // Calculate the remainder of the sum divided by 11
  const remainderBy11 = sum % 11;

  // Check if the TIN is valid based on the remainder
  const c10 = parseInt(tin.charAt(9), 10);
  if (remainderBy11 === 1) {
    return false;
  }
  if (remainderBy11 === 0) {
    return c10 === 0;
  }
  return c10 === 11 - remainderBy11;
}

/**
 * Checks if the date of birth in a Danish TIN (CPR or CVR number) is valid.
 * @param tin - The TIN to check.
 * @returns Whether the date of birth is valid.
 */
function isValidDate(tin: string): boolean {
  try {
    // Extract the day, month, and year from the TIN
    const day = parseInt(tin.substring(0, 2), 10);
    const month = parseInt(tin.substring(2, 4), 10);
    const year = parseInt(tin.substring(4, 6), 10);

    // Check if the date is valid for both 1900 and 2000 centuries
    return validate(1900 + year, month, day) || validate(2000 + year, month, day);
  } catch (e) {
    // Return false if the date is invalid or an error occurs
    return false;
  }
}

/**
 * Checks if a date is valid.
 * @param year - The year of the date.
 * @param month - The month of the date.
 * @param day - The day of the date.
 * @returns  Whether the date is valid.
 */
function validate(year: number, month: number, day: number): boolean {
  return month >= 1 && month <= 12 && day >= 1 && day <= getLastDayOfMonth(month, year);
}
