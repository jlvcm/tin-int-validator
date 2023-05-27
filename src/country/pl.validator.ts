import { dateValidate } from '../utils';

/**
 * Validate a Polish TIN.
 * @param tin The Polish TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validatePL(tin: string): boolean {
  if (!followsLength1PL(tin) && !followsLength2PL(tin)) {
    return false;
  }
  if (!followsPatternsPL(tin)) {
    return false;
  }
  if (!followsRulesPL(tin)) {
    return false;
  }
  return true;
}

/**
 * Check if a Polish TIN follows the Poland rule.
 * @param tin The Polish TIN to check.
 * @returns True if the TIN follows the Poland rule, false otherwise.
 */
function followsRulesPL(tin: string): boolean {
  return (followsLength1PL(tin) && followsRulePoland1(tin)) || (followsLength2PL(tin) && followsRulePoland2(tin));
}

/**
 * Check if a Polish TIN follows the pattern rule.
 * @param tin The Polish TIN to check.
 * @returns True if the TIN follows the pattern rule, false otherwise.
 */
function followsPatternsPL(tin: string): boolean {
  return followsLength1AndPattern1PL(tin) || followsLength2AndPattern2AndIsValidDatePL(tin);
}

/**
 * Check if a Polish TIN follows the length and pattern rule.
 * @param tin The Polish TIN to check.
 * @returns True if the TIN follows the length and pattern rule, false otherwise.
 */
function followsLength1AndPattern1PL(tin: string): boolean {
  return followsLength1PL(tin) && followsPattern1PL(tin);
}

/**
 * Check if a Polish TIN follows the length, pattern, and valid date rule.
 * @param tin The Polish TIN to check.
 * @returns True if the TIN follows the length, pattern, and valid date rule, false otherwise.
 */
function followsLength2AndPattern2AndIsValidDatePL(tin: string): boolean {
  return followsLength2PL(tin) && followsPattern2PL(tin) && isValidDatePL(tin);
}

/**
 * Check if a Polish TIN follows the length rule.
 * @param tin The Polish TIN to check.
 * @returns True if the TIN follows the length rule, false otherwise.
 */
function followsLength1PL(tin: string): boolean {
  return tin.length === 10;
}

/**
 * Check if a Polish TIN follows the pattern rule.
 * @param tin The Polish TIN to check.
 * @returns True if the TIN follows the pattern rule, false otherwise.
 */
function followsPattern1PL(tin: string): boolean {
  return /^\d{10}$/.test(tin);
}

/**
 * Check if a Polish TIN follows the length rule.
 * @param tin The Polish TIN to check.
 * @returns True if the TIN follows the length rule, false otherwise.
 */
function followsLength2PL(tin: string): boolean {
  return tin.length === 11;
}

/**
 * Check if a Polish TIN follows the pattern rule.
 * @param tin The Polish TIN to check.
 * @returns True if the TIN follows the pattern rule, false otherwise.
 */
function followsPattern2PL(tin: string): boolean {
  return /^\d{11}$/.test(tin);
}

/**
 * Check if a Polish TIN follows the Poland rule 1.
 * @param tin The Polish TIN to check.
 * @returns True if the TIN follows the Poland rule 1, false otherwise.
 */
function followsRulePoland1(tin: string): boolean {
  const digits = tin.split('').map(digit => parseInt(digit));
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const sum = digits.slice(0, 9).reduce((acc, digit, index) => acc + digit * weights[index], 0);
  const remainderBy11 = sum % 11;
  if (remainderBy11 === 10) {
    return false;
  }
  return digits[9] === remainderBy11;
}

/**
 * Check if a Polish TIN follows the Poland rule 2.
 * @param tin The Polish TIN to check.
 * @returns True if the TIN follows the Poland rule 2, false otherwise.
 */
function followsRulePoland2(tin: string): boolean {
  const c1 = parseInt(tin.charAt(0));
  const c2 = parseInt(tin.charAt(1));
  const c3 = parseInt(tin.charAt(2));
  const c4 = parseInt(tin.charAt(3));
  const c5 = parseInt(tin.charAt(4));
  const c6 = parseInt(tin.charAt(5));
  const c7 = parseInt(tin.charAt(6));
  const c8 = parseInt(tin.charAt(7));
  const c9 = parseInt(tin.charAt(8));
  const c10 = parseInt(tin.charAt(9));
  const c11 = parseInt(tin.charAt(10));

  const sum = c1 * 1 + c2 * 3 + c3 * 7 + c4 * 9 + c5 * 1 + c6 * 3 + c7 * 7 + c8 * 9 + c9 * 1 + c10 * 3;
  const lastDigit = sum % 10;

  return c11 === 10 - lastDigit;
}

/**
 * Check if a Polish TIN has a valid date.
 * @param tin The Polish TIN to check.
 * @returns True if the TIN has a valid date, false otherwise.
 */
function isValidDatePL(tin: string): boolean {
  try {
    const year = parseInt(tin.substring(0, 2));
    const month = parseInt(tin.substring(2, 4));
    const day = parseInt(tin.substring(4, 6));

    if (month >= 1 && month <= 12) {
      return dateValidate(1900 + year, month, day);
    }
    if (month >= 21 && month <= 32) {
      return dateValidate(2000 + year, month - 20, day);
    }
    if (month >= 41 && month <= 52) {
      return dateValidate(2100 + year, month - 40, day);
    }
    if (month >= 61 && month <= 72) {
      return dateValidate(2200 + year, month - 60, day);
    }
    return month >= 81 && month <= 92 && dateValidate(1800 + year, month - 80, day);
  } catch (e) {
    return false;
  }
}
