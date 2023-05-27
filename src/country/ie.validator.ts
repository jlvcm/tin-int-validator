/**
 * Validate an Irish TIN.
 * @param tin The Irish TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateIE(tin: string): boolean {
  if (!followsLength1(tin) && !followsLength2(tin)) {
    return false;
  }
  if ((followsLength1(tin) && !followsPattern1(tin)) || (followsLength2(tin) && !followsPattern2(tin))) {
    return false;
  }
  if (!followsRules(tin)) {
    return false;
  }
  return true;
}

/**
 * Check if an Irish TIN follows the length 1 rule.
 * @param tin The Irish TIN to check.
 * @returns True if the TIN follows the length 1 rule, false otherwise.
 */
function followsLength1(tin: string): boolean {
  return tin.length === 9;
}

/**
 * Check if an Irish TIN follows the pattern 1 rule.
 * @param tin The Irish TIN to check.
 * @returns True if the TIN follows the pattern 1 rule, false otherwise.
 */
function followsPattern1(tin: string): boolean {
  return /^\d{7}[a-wA-W]([a-iA-I]|W)$/.test(tin);
}

/**
 * Check if an Irish TIN follows the length 2 rule.
 * @param tin The Irish TIN to check.
 * @returns True if the TIN follows the length 2 rule, false otherwise.
 */
function followsLength2(tin: string): boolean {
  return tin.length === 8;
}

/**
 * Check if an Irish TIN follows the pattern 2 rule.
 * @param tin The Irish TIN to check.
 * @returns True if the TIN follows the pattern 2 rule, false otherwise.
 */
function followsPattern2(tin: string): boolean {
  return /^\d{7}[a-wA-W]$/.test(tin);
}

/**
 * Check if an Irish TIN follows the Ireland rule.
 * @param tin The Irish TIN to check.
 * @returns True if the TIN follows the Ireland rule, false otherwise.
 */
function followsRules(tin: string): boolean {
  const c1 = parseInt(tin.charAt(0), 10);
  const c2 = parseInt(tin.charAt(1), 10);
  const c3 = parseInt(tin.charAt(2), 10);
  const c4 = parseInt(tin.charAt(3), 10);
  const c5 = parseInt(tin.charAt(4), 10);
  const c6 = parseInt(tin.charAt(5), 10);
  const c7 = parseInt(tin.charAt(6), 10);
  const c8 = tin.charCodeAt(7);
  const c9 = tin.length >= 9 ? letterToNumber(tin.charAt(8)) : 0;
  const c8Bis = tin.charAt(7);
  const sum = c9 * 9 + c1 * 8 + c2 * 7 + c3 * 6 + c4 * 5 + c5 * 4 + c6 * 3 + c7 * 2;
  const remainderBy23 = sum % 23;
  if (remainderBy23 !== 0) {
    return c8 === 'A'.charCodeAt(0) + remainderBy23 - 1 || c8 === 'a'.charCodeAt(0) + remainderBy23 - 1;
  }
  return c8Bis.toLowerCase() === 'w';
}

/**
 * Convert an Irish TIN letter to a number.
 * @param toConv The letter to convert.
 * @returns The corresponding number.
 */
function letterToNumber(toConv: string): number {
  if (toConv === 'W' || toConv === 'w') {
    return 0;
  }
  const a = 'A'.charCodeAt(0);
  return toConv.charCodeAt(0) - a + 1;
}
