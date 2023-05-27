import { isInRange } from '../utils';

/**
 * Validate a Slovenian TIN.
 * @param tin The Slovenian TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateSI(tin: string): boolean {
  if (!followsLengthSI(tin)) {
    return false;
  }
  if (!followsPatternSI(tin)) {
    return false;
  }
  if (!followsRulesSI(tin)) {
    return false;
  }
  return true;
}

/**
 * Check if a Slovenian TIN follows the length rule.
 * @param tin The Slovenian TIN to check.
 * @returns True if the TIN follows the length rule, false otherwise.
 */
function followsLengthSI(tin: string): boolean {
  return tin.length === 8;
}

/**
 * Check if a Slovenian TIN follows the pattern rule.
 * @param tin The Slovenian TIN to check.
 * @returns True if the TIN follows the pattern rule, false otherwise.
 */
function followsPatternSI(tin: string): boolean {
  return /^[1-9]\d{7}$/.test(tin);
}

/**
 * Check if a Slovenian TIN follows the range and Slovenia rules.
 * @param tin The Slovenian TIN to check.
 * @returns True if the TIN follows the range and Slovenia rules, false otherwise.
 */
function followsRulesSI(tin: string): boolean {
  return followsRangeRuleSI(tin) && followsSloveniaRuleSI(tin);
}

/**
 * Check if a Slovenian TIN follows the range rule.
 * @param tin The Slovenian TIN to check.
 * @returns True if the TIN follows the range rule, false otherwise.
 */
function followsRangeRuleSI(tin: string): boolean {
  const intTIN = parseInt(tin.substring(0, 7));
  return isInRange(intTIN, 999999, 10000000);
}

/**
 * Check if a Slovenian TIN follows the Slovenia rule.
 * @param tin The Slovenian TIN to check.
 * @returns True if the TIN follows the Slovenia rule, false otherwise.
 */
function followsSloveniaRuleSI(tin: string): boolean {
  const c1 = parseInt(tin.charAt(0));
  const c2 = parseInt(tin.charAt(1));
  const c3 = parseInt(tin.charAt(2));
  const c4 = parseInt(tin.charAt(3));
  const c5 = parseInt(tin.charAt(4));
  const c6 = parseInt(tin.charAt(5));
  const c7 = parseInt(tin.charAt(6));
  const c8 = parseInt(tin.charAt(7));
  const sum = c1 * 8 + c2 * 7 + c3 * 6 + c4 * 5 + c5 * 4 + c6 * 3 + c7 * 2;
  const remainderBy11 = sum % 11;
  return c8 === 11 - remainderBy11 || (11 - remainderBy11 === 10 && c8 === 0);
}
