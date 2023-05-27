import { dateValidate, getUnit, sumDigit } from '../utils';

/**
 * Validate a Swedish TIN.
 * @param tin The Swedish TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateSE(tin: string): boolean {
  const normalizedTIN = tin.replace('-', '').replace('+', '');

  if (!followsLength1And2SE(normalizedTIN) && !followsLength3And4SE(normalizedTIN)) {
    return false;
  }
  if (!followsPatternsSE(normalizedTIN)) {
    return false;
  }
  if (!followsRulesSE(normalizedTIN)) {
    return false;
  }
  return true;
}

/**
 * Check if a Swedish TIN follows the length rule 1 and 2.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows the length rule 1 and 2, false otherwise.
 */
function followsLength1And2SE(tin: string): boolean {
  return tin.length === 10;
}

/**
 * Check if a Swedish TIN follows the length rule 3 and 4.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows the length rule 3 and 4, false otherwise.
 */
function followsLength3And4SE(tin: string): boolean {
  return tin.length === 12;
}

/**
 * Check if a Swedish TIN follows any of the valid patterns.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows any of the valid patterns, false otherwise.
 */
function followsPatternsSE(tin: string): boolean {
  return (
    followsPatternAndIsValidDateSE(tin) ||
    followsPattern2AndIsValidDate2SE(tin) ||
    followsPattern3AndIsValidDate3SE(tin) ||
    followsPattern4AndIsValidDate4SE(tin)
  );
}

/**
 * Check if a Swedish TIN follows pattern 1 and is a valid date.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows pattern 1 and is a valid date, false otherwise.
 */
function followsPatternAndIsValidDateSE(tin: string): boolean {
  return followsPatternSE(tin) && isValidDateSE(tin);
}

/**
 * Check if a Swedish TIN follows pattern 2 and is a valid date.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows pattern 2 and is a valid date, false otherwise.
 */
function followsPattern2AndIsValidDate2SE(tin: string): boolean {
  return followsPattern2SE(tin) && isValidDate2SE(tin);
}

/**
 * Check if a Swedish TIN follows pattern 3 and is a valid date.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows pattern 3 and is a valid date, false otherwise.
 */
function followsPattern3AndIsValidDate3SE(tin: string): boolean {
  return followsPattern3SE(tin) && isValidDate3SE(tin);
}

/**
 * Check if a Swedish TIN follows pattern 4 and is a valid date.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows pattern 4 and is a valid date, false otherwise.
 */
function followsPattern4AndIsValidDate4SE(tin: string): boolean {
  return followsPattern4SE(tin) && isValidDate4SE(tin);
}

/**
 * Check if a Swedish TIN follows the rules.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows the rules, false otherwise.
 */
function followsRulesSE(tin: string): boolean {
  return (tin.length === 10 && followsSwedenRule1And2SE(tin)) || (tin.length === 12 && followsSwedenRule3And4SE(tin));
}

/**
 * Check if a Swedish TIN follows pattern 1.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows pattern 1, false otherwise.
 */
function followsPatternSE(tin: string): boolean {
  return /^\d{2}[0-1]\d[0-3]\d{5}$/.test(tin);
}

/**
 * Check if a Swedish TIN follows pattern 2.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows pattern 2, false otherwise.
 */
function followsPattern2SE(tin: string): boolean {
  return /^\d{2}[0-1]\d[6-9]\d{5}$/.test(tin);
}

/**
 * Check if a Swedish TIN follows pattern 3.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows pattern 3, false otherwise.
 */
function followsPattern3SE(tin: string): boolean {
  return /^(1[89]|20)\d{2}(0[1-9]|1[012])(0[1-9]|[1-2][0-9]|3[0-1])\d{4}$/.test(tin);
}

/**
 * Check if a Swedish TIN follows pattern 4.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows pattern 4, false otherwise.
 */
function followsPattern4SE(tin: string): boolean {
  return /^(1[89]|20)\d{2}(0[1-9]|1[012])(6[1-9]|[7-8][0-9]|9[0-1])\d{4}$/.test(tin);
}

/**
 * Check if a Swedish TIN follows rules 1 and 2.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows rules 1 and 2, false otherwise.
 */
function followsSwedenRule1And2SE(tin: string): boolean {
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

  try {
    const sum = c2 + c4 + c6 + c8 + sumDigit(c1 * 2) + sumDigit(c3 * 2) + sumDigit(c5 * 2) + sumDigit(c7 * 2) + sumDigit(c9 * 2);
    const check = 10 - getUnit(sum);
    if (check !== 10) {
      return c10 === check;
    }
    return c10 === 0;
  } catch (e) {
    return false;
  }
}

/**
 * Check if a Swedish TIN follows rules 3 and 4.
 * @param tin The Swedish TIN to check.
 * @returns True if the TIN follows rules 3 and 4, false otherwise.
 */
function followsSwedenRule3And4SE(tin: string): boolean {
  const c3 = parseInt(tin.charAt(2));
  const c4 = parseInt(tin.charAt(3));
  const c5 = parseInt(tin.charAt(4));
  const c6 = parseInt(tin.charAt(5));
  const c7 = parseInt(tin.charAt(6));
  const c8 = parseInt(tin.charAt(7));
  const c9 = parseInt(tin.charAt(8));
  const c10 = parseInt(tin.charAt(9));
  const c11 = parseInt(tin.charAt(10));
  const c12 = parseInt(tin.charAt(11));

  try {
    const sum = c4 + c6 + c8 + c10 + sumDigit(c3 * 2) + sumDigit(c5 * 2) + sumDigit(c7 * 2) + sumDigit(c9 * 2) + sumDigit(c11 * 2);
    const check = 10 - getUnit(sum);
    if (check !== 10) {
      return c12 === check;
    }
    return c12 === 0;
  } catch (e) {
    return false;
  }
}

/**
 * Check if a date is valid for a Swedish TIN following pattern 1 or 2.
 * @param tin The Swedish TIN to check.
 * @returns True if the date is valid, false otherwise.
 */
function isValidDateSE(tin: string): boolean {
  try {
    const year = parseInt(tin.substring(0, 2));
    const month = parseInt(tin.substring(2, 4));
    const day = parseInt(tin.substring(4, 6));
    return dateValidate(1900 + year, month, day) || dateValidate(2000 + year, month, day);
  } catch (e) {
    return false;
  }
}

/**
 * Check if a date is valid for a Swedish TIN following pattern 2.
 * @param tin The Swedish TIN to check.
 * @returns True if the date is valid, false otherwise.
 */
function isValidDate2SE(tin: string): boolean {
  try {
    const year = parseInt(tin.substring(0, 2));
    const month = parseInt(tin.substring(2, 4));
    const day = parseInt(tin.substring(4, 6));
    return dateValidate(1900 + year, month, day - 60) || dateValidate(2000 + year, month, day - 60);
  } catch (e) {
    return false;
  }
}

/**
 * Check if a date is valid for a Swedish TIN following pattern 3.
 * @param tin The Swedish TIN to check.
 * @returns True if the date is valid, false otherwise.
 */
function isValidDate3SE(tin: string): boolean {
  try {
    const year = parseInt(tin.substring(0, 4));
    const month = parseInt(tin.substring(4, 6));
    const day = parseInt(tin.substring(6, 8));
    return dateValidate(year, month, day);
  } catch (e) {
    return false;
  }
}

/**
 * Check if a date is valid for a Swedish TIN following pattern 4.
 * @param tin The Swedish TIN to check.
 * @returns True if the date is valid, false otherwise.
 */
function isValidDate4SE(tin: string): boolean {
  try {
    const year = parseInt(tin.substring(0, 4));
    const month = parseInt(tin.substring(4, 6));
    const day = parseInt(tin.substring(6, 8));
    return dateValidate(year, month, day - 60);
  } catch (e) {
    return false;
  }
}
