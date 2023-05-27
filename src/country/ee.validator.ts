import { dateValidate } from '../utils';

const LENGTH = 11;

const PATTERN = /^[1-6]\d{2}[0-1]\d[0-3]\d{5}$/;

/**
 * Validate an Estonian TIN.
 * @param tin The Estonian TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateEE(tin: string): boolean {
  if (tin.length !== LENGTH) {
    return false;
  }
  if (!PATTERN.test(tin) || !isValidDate(tin)) {
    return false;
  }
  if (!followsRules(tin)) {
    return false;
  }
  return true;
}

/**
 * Check if an Estonian TIN follows the Estonia rule.
 * @param tin The Estonian TIN to check.
 * @returns True if the TIN follows the Estonia rule, false otherwise.
 */
function followsRules(tin: string): boolean {
  return followsRangeRule(tin) && followsEstoniaRule(tin);
}

/**
 * Check if an Estonian TIN follows the range rule.
 * @param tin The Estonian TIN to check.
 * @returns True if the TIN follows the range rule, false otherwise.
 */
function followsRangeRule(tin: string): boolean {
  const range = parseInt(tin.substring(7, 10), 10);
  return range > 0 && range < 711;
}

/**
 * Check if an Estonian TIN follows the Estonia rule.
 * @param tin The Estonian TIN to check.
 * @returns True if the TIN follows the Estonia rule, false otherwise.
 */
function followsEstoniaRule(tin: string): boolean {
  // Define the weights for each digit
  const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];

  // Convert the TIN string to an array of digits
  const digits = tin.split('').map(char => parseInt(char, 10));

  // Calculate the sum of the products of the digits and their weights
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * weights[i];
  }

  // Calculate the remainder of the sum divided by 11
  const remainderBy11 = sum % 11;

  // Check if the TIN is valid based on the remainder
  return (remainderBy11 < 10 && remainderBy11 === digits[10]) || (remainderBy11 === 10 && followsEstoniaRulePart2(tin));
}

/**
 * Check if an Estonian TIN follows the Estonia rule part 2.
 * @param tin The Estonian TIN to check.
 * @returns True if the TIN follows the Estonia rule part 2, false otherwise.
 */
function followsEstoniaRulePart2(tin: string): boolean {
  // Define the weights for each digit
  const weights = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];

  // Convert the TIN string to an array of digits
  const digits = tin.split('').map(char => parseInt(char, 10));

  // Calculate the sum of the products of the digits and their weights
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * weights[i];
  }

  // Calculate the remainder of the sum divided by 11
  const remainderBy11 = sum % 11;

  // Check if the TIN is valid based on the remainder
  return (remainderBy11 < 10 && remainderBy11 === digits[10]) || (remainderBy11 === 10 && digits[10] === 0);
}

/**
 * Validate the date in an Estonian TIN.
 * @param tin The Estonian TIN to validate.
 * @returns True if the date in the TIN is valid, false otherwise.
 */
function isValidDate(tin: string): boolean {
  try {
    const year = parseInt(tin.substring(1, 3), 10);
    const month = parseInt(tin.substring(3, 5), 10);
    const day = parseInt(tin.substring(5, 7), 10);
    return dateValidate(1900 + year, month, day) || dateValidate(2000 + year, month, day);
  } catch (e) {
    return false;
  }
}
