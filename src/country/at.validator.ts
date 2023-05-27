import { clearString, getUnit, sumDigit } from '../utils';

// Define the length and pattern of a valid Austrian TIN
const LENGTH = 9;
const PATTERN = /\d{9}/;

/**
 * Validate an Austrian TIN.
 * @param tin The Austrian TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateAT(tin: string): boolean {
  // Normalize the TIN by removing any non-alphanumeric characters
  const normalizedTIN = clearString(tin);
  // Check that the TIN has the correct length, pattern, and follows the Austria rule
  if (normalizedTIN.length !== LENGTH || !PATTERN.test(normalizedTIN) || !followsAustriaRule(normalizedTIN)) {
    return false;
  }
  return true;
}

/**
 * Check if an Austrian TIN follows the Austria rule.
 * @param tin The Austrian TIN to check.
 * @returns True if the TIN follows the Austria rule, false otherwise.
 */
function followsAustriaRule(tin: string): boolean {
  // Convert the TIN to an array of digits
  const digits = tin.split('').map(Number);
  // Calculate the sum of the digits according to the Austria rule
  const sum =
    digits[0] +
    digits[2] +
    digits[4] +
    digits[6] +
    sumDigit(digits[1] * 2) +
    sumDigit(digits[3] * 2) +
    sumDigit(digits[5] * 2) +
    sumDigit(digits[7] * 2);
  // Calculate the check digit using the sum
  const checkDigit = getUnit(100 - sum);
  // Check if the last digit of the TIN matches the check digit
  return digits[8] === checkDigit;
}
