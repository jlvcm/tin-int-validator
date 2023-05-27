const LENGTH = 9;
const PATTERN = /^[0-9]\d{7}[A-Z]$/;

const RECODE_VALUE = {
  0: 1,
  1: 0,
  2: 5,
  3: 7,
  4: 9,
  5: 13,
  6: 15,
  7: 17,
  8: 19,
  9: 21,
};

/**
 * Validate a Cypriot TIN.
 * @param tin The Cypriot TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateCY(tin: string): boolean {
  if (tin.length !== LENGTH) {
    return false;
  }
  if (!PATTERN.test(tin)) {
    return false;
  }
  if (!followsRules(tin)) {
    return false;
  }
  return true;
}

/**
 * Check if a Cypriot TIN follows the Cyprus rule.
 * @param tin The Cypriot TIN to check.
 * @returns True if the TIN follows the Cyprus rule, false otherwise.
 */
function followsRules(tin: string): boolean {
  // Convert the TIN string to an array of digits
  const digits = tin.split('').map(digit => parseInt(digit, 10));

  // Calculate the sum of the even-positioned digits
  const evenPositionNumbersSum = digits.filter((_, index) => index % 2 === 1).reduce((acc, digit) => acc + digit, 0);

  // Calculate the sum of the odd-positioned digits after recoding them
  const recodedSum = recodeValue(digits[0]) + recodeValue(digits[2]) + recodeValue(digits[4]) + recodeValue(digits[6]);

  // Calculate the remainder of the sum of the even and odd-positioned digits divided by 26
  const remainderBy26 = (evenPositionNumbersSum + recodedSum) % 26;

  // Check if the last character of the TIN matches the calculated value
  const c9 = tin.charAt(8);
  return remainderBy26 + 65 === c9.charCodeAt(0);
}

/**
 * Recode a Cypriot TIN value.
 * @param x The value to recode.
 * @returns The recoded value.
 */
function recodeValue(x: number): number {
  return RECODE_VALUE[x as keyof typeof RECODE_VALUE] ?? -1;
}
