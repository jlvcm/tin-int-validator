/**
 * Validate a Portuguese TIN.
 * @param tin The Portuguese TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validatePT(tin: string): boolean {
  if (!followsLengthPT(tin)) {
    return false;
  }
  if (!followsPatternPT(tin)) {
    return false;
  }
  if (!followsRulesPT(tin)) {
    return false;
  }
  return true;
}

/**
 * Check if a Portuguese TIN follows the length rule.
 * @param tin The Portuguese TIN to check.
 * @returns True if the TIN follows the length rule, false otherwise.
 */
function followsLengthPT(tin: string): boolean {
  return tin.length === 9;
}

/**
 * Check if a Portuguese TIN follows the pattern rule.
 * @param tin The Portuguese TIN to check.
 * @returns True if the TIN follows the pattern rule, false otherwise.
 */
function followsPatternPT(tin: string): boolean {
  return /^\d{9}$/.test(tin);
}

/**
 * Check if a Portuguese TIN follows the rules.
 * @param tin The Portuguese TIN to check.
 * @returns True if the TIN follows the rules, false otherwise.
 */
function followsRulesPT(tin: string): boolean {
  const c1 = parseInt(tin.charAt(0));
  const c2 = parseInt(tin.charAt(1));
  const c3 = parseInt(tin.charAt(2));
  const c4 = parseInt(tin.charAt(3));
  const c5 = parseInt(tin.charAt(4));
  const c6 = parseInt(tin.charAt(5));
  const c7 = parseInt(tin.charAt(6));
  const c8 = parseInt(tin.charAt(7));
  const c9 = parseInt(tin.charAt(8));

  const sum = c1 * 9 + c2 * 8 + c3 * 7 + c4 * 6 + c5 * 5 + c6 * 4 + c7 * 3 + c8 * 2;
  const remainderBy11 = sum % 11;
  const checkDigit = 11 - remainderBy11;

  if (checkDigit <= 9) {
    return checkDigit === c9;
  }

  return checkDigit === 10 ? c9 === 0 : c9 === 0;
}
