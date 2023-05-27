import { clearString } from '../utils';

const tabConvertToChar = [
  'T',
  'R',
  'W',
  'A',
  'G',
  'M',
  'Y',
  'F',
  'P',
  'D',
  'X',
  'B',
  'N',
  'J',
  'Z',
  'S',
  'Q',
  'V',
  'H',
  'L',
  'C',
  'K',
  'E',
];

const LENGTH = 9;

/**
 * Validate a Spanish TIN.
 * @param tin The Spanish TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateES(tin: string): boolean {
  const normalizedTIN = fillWith0(clearString(tin));
  if (normalizedTIN.length !== LENGTH) {
    return false;
  }
  if (!followsPattern1(normalizedTIN) && !followsPattern2(normalizedTIN)) {
    return false;
  }
  if (!followsRules(normalizedTIN)) {
    return false;
  }
  return true;
}

/**
 * Check if a Spanish TIN follows pattern 1.
 * @param tin The Spanish TIN to check.
 * @returns True if the TIN follows pattern 1, false otherwise.
 */
function followsPattern1(tin: string): boolean {
  return /^\d{8}[a-zA-Z]$/.test(tin);
}

/**
 * Check if a Spanish TIN follows pattern 2.
 * @param tin The Spanish TIN to check.
 * @returns True if the TIN follows pattern 2, false otherwise.
 */
function followsPattern2(tin: string): boolean {
  return /^[XYZKLMxyzklm]\d{7}[a-zA-Z]$/.test(tin);
}

/**
 * Check if a Spanish TIN follows the Spanish rule.
 * @param tin The Spanish TIN to check.
 * @returns True if the TIN follows the Spanish rule, false otherwise.
 */
function followsRules(tin: string): boolean {
  return (followsPattern1(tin) && followsESRule1(tin)) || (followsPattern2(tin) && followsESRule2(tin));
}

/**
 * Check if a Spanish TIN follows the Spanish rule 1.
 * @param tin The Spanish TIN to check.
 * @returns True if the TIN follows the Spanish rule 1, false otherwise.
 */
function followsESRule1(tin: string): boolean {
  try {
    // Extract the number part of the TIN and the check digit
    const number = parseInt(tin.substring(0, tin.length - 1), 10);
    const checkDigit = tin.charAt(tin.length - 1);

    // Calculate the remainder of the number divided by 23
    const remainderBy23 = number % 23;

    // Calculate the sum of the remainder and 1
    const sum = remainderBy23 + 1;

    // Check if the check digit matches the character corresponding to the sum
    return checkDigit.toUpperCase() === getCharFromNumber(sum);
  } catch (ex) {
    // If there's an error, return false
    return false;
  }
}

/**
 * Check if a Spanish TIN follows the Spanish rule 2.
 * @param tin The Spanish TIN to check.
 * @returns True if the TIN follows the Spanish rule 2, false otherwise.
 */
function followsESRule2(tin: string): boolean {
  try {
    // Get the first character of the TIN and convert it to a number
    const firstCharNumber = getNumberFromChar(tin.charAt(0));

    // Calculate the number part of the TIN by concatenating the first character number and the rest of the string
    const number = parseInt(firstCharNumber + tin.substring(1, tin.length - 1), 10);

    // Get the check digit
    const checkDigit = tin.charAt(tin.length - 1);

    // Calculate the remainder of the number divided by 23
    const remainderBy23 = number % 23;

    // Calculate the sum of the remainder and 1
    const sum = remainderBy23 + 1;

    // Check if the check digit matches the character corresponding to the sum
    return checkDigit.toUpperCase() === getCharFromNumber(sum);
  } catch (ex) {
    // If there's an error, return false
    return false;
  }
}

/**
 * Get the number corresponding to a Spanish TIN character.
 * @param m The Spanish TIN character to convert.
 * @returns The number corresponding to the character, or -1 if the character is invalid.
 */
function getNumberFromChar(m: string): number {
  switch (m.toUpperCase()) {
    case 'K':
    case 'L':
    case 'M':
    case 'X':
      return 0;
    case 'Y':
      return 1;
    case 'Z':
      return 2;
    default:
      return -1;
  }
}

/**
 * Get the character corresponding to a Spanish TIN number.
 * @param sum The Spanish TIN number to convert.
 * @returns The character corresponding to the number.
 */
function getCharFromNumber(sum: number): string {
  return tabConvertToChar[sum - 1];
}

/**
 * Fill a Spanish TIN with leading zeros.
 * @param tin The Spanish TIN to fill.
 * @returns The filled Spanish TIN.
 */
function fillWith0(tin: string): string {
  return tin.padStart(9, '0');
}
