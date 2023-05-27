import { clearString } from '../utils';

// Define the length and pattern of a valid US TIN
const LENGTH = 9;
const PATTERN = /\d{9}/;

/**
 * Validate an US TIN.
 * @param tin The US TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateUS(tin: string): boolean {
  // Normalize the TIN by removing any non-alphanumeric characters
  const normalizedTIN = clearString(tin);
  // Check that the TIN has the correct length, pattern, and follows the US rule
  if (normalizedTIN.length !== LENGTH || !PATTERN.test(normalizedTIN)) {
    return false;
  }
  return true;
}
