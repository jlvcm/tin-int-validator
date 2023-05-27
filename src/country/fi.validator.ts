import { dateValidate } from '../utils';

/**
 * Length of a valid Finnish TIN.
 */
const LENGTH = 11;

/**
 * Regular expression pattern for validating the Finnish TIN.
 */
const PATTERN = /^[0-3]\d[0-1]\d{3}[+-A]\d{3}[0-9A-Z]$/;

/**
 * Validates a Finnish TIN (Tax Identification Number).
 * @param tin - The TIN to validate.
 * @returns A boolean indicating whether the TIN is valid.
 */
export function validateFI(tin: string): boolean {
  if (tin.length !== LENGTH) {
    return false;
  }
  if (!PATTERN.test(tin) || !isValidDate(tin)) {
    return false;
  }
  if (!followsFinlandRule(tin)) {
    return false;
  }
  return true;
}

/**
 * Checks if the TIN follows the rules specific to Finland.
 * @param tin - The TIN to check.
 * @returns A boolean indicating whether the TIN follows the rules.
 */
function followsFinlandRule(tin: string): boolean {
  // Extract the number part of the TIN and convert it to a number
  const number = parseInt(tin.substring(0, 6) + tin.substring(7, 10), 10);

  // Calculate the remainder of the number divided by 31
  const remainderBy31 = number % 31;

  // Get the check digit
  const checkDigit = tin.charAt(10);

  // Check if the check digit matches the character corresponding to the remainder
  return getMatch(remainderBy31) === checkDigit;
}

/**
 * Gets the character match for the given number.
 * @param number - The number to get the match for.
 * @returns The character match.
 */
function getMatch(number: number): string {
  if (number < 10) {
    return number.toString();
  }
  switch (number) {
    case 10:
      return 'A';
    case 11:
      return 'B';
    case 12:
      return 'C';
    case 13:
      return 'D';
    case 14:
      return 'E';
    case 15:
      return 'F';
    case 16:
      return 'H';
    case 17:
      return 'J';
    case 18:
      return 'K';
    case 19:
      return 'L';
    case 20:
      return 'M';
    case 21:
      return 'N';
    case 22:
      return 'P';
    case 23:
      return 'R';
    case 24:
      return 'S';
    case 25:
      return 'T';
    case 26:
      return 'U';
    case 27:
      return 'V';
    case 28:
      return 'W';
    case 29:
      return 'X';
    case 30:
      return 'Y';
    default:
      return ' ';
  }
}

/**
 * Checks if the date portion of the TIN is a valid date.
 * @param tin - The TIN to check.
 * @returns A boolean indicating whether the date portion of the TIN is valid.
 */
function isValidDate(tin: string): boolean {
  try {
    // Extract the day, month, and year parts of the TIN and convert them to numbers
    const day = parseInt(tin.substring(0, 2), 10);
    const month = parseInt(tin.substring(2, 4), 10);
    const year = parseInt(tin.substring(4, 6), 10);

    // Get the seventh character of the TIN
    const c7 = tin.substring(6, 7);

    // Check if the TIN is valid based on the seventh character
    if (c7 === '+') {
      return dateValidate(1800 + year, month, day);
    } else if (c7 === '-') {
      return dateValidate(1900 + year, month, day);
    } else {
      return c7 === 'A' && dateValidate(2000 + year, month, day);
    }
  } catch (e) {
    // If there's an error, return false
    return false;
  }
}
