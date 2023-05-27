import { clearString } from '../utils';

const LENGTH = 13;
const PATTERN = /^[0-3]\d{12}$/;

/**
 * Validate a French TIN.
 * @param tin The French TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateFR(tin: string): boolean {
  const str = clearString(tin);
  if (str.length !== LENGTH) {
    return false;
  }
  if (!PATTERN.test(str)) {
    return false;
  }
  if (!followsFranceRule(str)) {
    return false;
  }
  return true;
}

/**
 * Check if a French TIN follows the France rule.
 * @param tin The French TIN to check.
 * @returns True if the TIN follows the France rule, false otherwise.
 */
function followsFranceRule(tin: string): boolean {
  // Extract the number part of the TIN and convert it to a number
  const number = parseInt(tin.substring(0, 10), 10);

  // Get the check digits
  let checkDigits = 0;
  const remainderBy511 = number % 511;
  if (remainderBy511 < 100) {
    if (remainderBy511 < 10) {
      checkDigits = parseInt(tin.substring(12, 13), 10);
    } else {
      checkDigits = parseInt(tin.substring(11, 13), 10);
    }
  } else {
    checkDigits = parseInt(tin.substring(10, 13), 10);
  }

  // Check if the TIN is valid based on the remainder and check digits
  return remainderBy511 === checkDigits;
}
