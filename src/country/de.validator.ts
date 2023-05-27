const LENGTH_A = 11;
const LENGTH_B = 10;

/**
 * Validate a German TIN.
 * @param tin The German TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateDE(tin: string): boolean {
  const normalizedTIN = tin.replace('/', '');
  if (!followsLength(normalizedTIN)) {
    return false;
  }
  if (followsLength(normalizedTIN) && !followsPattern(normalizedTIN)) {
    return false;
  }
  if (!followsRules(normalizedTIN)) {
    return false;
  }
  return true;
}

/**
 * Check if a German TIN follows the correct length.
 * @param tin The German TIN to check.
 * @returns True if the TIN follows the correct length, false otherwise.
 */
function followsLength(tin: string): boolean {
  return tin.length === LENGTH_A || tin.length === LENGTH_B;
}

/**
 * Check if a German TIN follows the correct pattern.
 * @param tin The German TIN to check.
 * @returns True if the TIN follows the correct pattern, false otherwise.
 */
function followsPattern(tin: string): boolean {
  return followsPattern1(tin) || followsPattern2(tin);
}

/**
 * Check if a German TIN follows pattern 1.
 * @param tin The German TIN to check.
 * @returns True if the TIN follows pattern 1, false otherwise.
 */
function followsPattern1(tin: string): boolean {
  // Check if the TIN is a string of 11 digits starting with a non-zero digit
  if (!/[1-9]\d{10}/.test(tin)) {
    return false;
  }

  // Convert the TIN string to an array of digits
  const digits = tin.split('').map(digit => parseInt(digit));

  // Count the number of occurrences of each digit
  const digitCounts = new Array(10).fill(0);
  for (let j = 0; j < 10; ++j) {
    ++digitCounts[digits[j]];
  }

  // Check if any digit occurs twice and if 0 occurs
  let isEncounteredTwice = false;
  let isEncounteredZero = false;
  for (let k = 0; k < 10; ++k) {
    if (digitCounts[k] === 2) {
      if (isEncounteredTwice) {
        return false;
      }
      isEncounteredTwice = true;
    }
    if (digitCounts[k] === 0) {
      if (isEncounteredZero) {
        return false;
      }
      isEncounteredZero = true;
    }
  }

  // Check if 0 occurs
  return isEncounteredZero;
}

/**
 * Check if a German TIN follows pattern 2.
 * @param tin The German TIN to check.
 * @returns True if the TIN follows pattern 2, false otherwise.
 */
function followsPattern2(tin: string): boolean {
  // Check if the TIN is a string of 11 digits starting with a non-zero digit
  if (!/[1-9]\d{10}/.test(tin)) {
    return false;
  }

  // Convert the TIN string to an array of digits
  const digits = tin.split('').map(digit => parseInt(digit));

  // Check if any digit occurs three times in a row
  for (let i = 0; i < 8; ++i) {
    if (digits[i] === digits[i + 1] && digits[i + 1] === digits[i + 2]) {
      return false;
    }
  }

  // Count the number of occurrences of each digit
  const digitCounts = new Array(10).fill(0);
  for (let j = 0; j < 10; ++j) {
    ++digitCounts[digits[j]];
  }

  // Check if any digit occurs more than three times or if any digit occurs twice or three times
  let isEncounteredTwice = false;
  let isEncounteredThrice = false;
  for (let k = 0; k < 10; ++k) {
    if (digitCounts[k] > 3) {
      return false;
    }
    if (digitCounts[k] === 3) {
      if (isEncounteredThrice) {
        return false;
      }
      isEncounteredThrice = true;
    }
    if (digitCounts[k] === 2) {
      if (isEncounteredTwice) {
        return false;
      }
      isEncounteredTwice = true;
    }
  }

  // Check if any digit occurs twice or three times
  return isEncounteredTwice || isEncounteredThrice;
}

/**
 * Check if a German TIN follows the German rule.
 * @param tin The German TIN to check.
 * @returns True if the TIN follows the German rule, false otherwise.
 */
function followsRules(tin: string): boolean {
  return (parseInt('11') === tin.length && followsRuleGermany1(tin)) || followsRuleGermany2(tin);
}

/**
 * Check if a German TIN follows rule 1.
 * @param tin The German TIN to check.
 * @returns True if the TIN follows rule 1, false otherwise.
 */
function followsRuleGermany1(tin: string): boolean {
  // Convert the TIN string to an array of digits
  const c1 = parseInt(tin.charAt(0));
  const c2 = new Array(9);
  for (let i = 0; i < 9; ++i) {
    c2[i] = parseInt(tin.charAt(i + 1));
  }

  // Calculate the first step of the algorithm
  let result = (c1 + 10) % 10;
  if (result === 0) {
    result = 10;
  }
  result *= 2;

  // Calculate the second step of the algorithm
  let x = result % 11;
  for (let j = 0; j < 9; ++j) {
    x = (x + c2[j]) % 10;
    if (x === 0) {
      x = 10;
    }
    x *= 2;
    x %= 11;
  }

  // Calculate the third step of the algorithm
  const c3 = parseInt(tin.charAt(10));
  const total = 11 - x;
  if (total === 10) {
    return c3 === 0;
  }
  return total === c3;
}

/**
 * Check if a German TIN follows rule 2.
 * @param tin The German TIN to check.
 * @returns True if the TIN follows rule 2, false otherwise.
 */
export function followsRuleGermany2(tin: string): boolean {
  return parseInt(tin.charAt(10)) === calculateCheckDigit(tin);
}

/**
 * Calculate the check digit for a German TIN.
 * @param tin The German TIN to calculate the check digit for.
 * @returns The check digit.
 */
export function calculateCheckDigit(tin: string): number {
  // Convert the TIN string to an array of characters
  const chars = tin.split('');

  // Initialize the remainder and digit variables
  let remainder_mod_ten = 0;
  let remainder_mod_eleven = 10;
  let digit = 0;

  // Calculate the remainder modulo 10 and 11 for each digit except the last one
  for (let counter = 0; counter < tin.length - 1; ++counter) {
    digit = parseInt(chars[counter]);
    remainder_mod_ten = (digit + remainder_mod_eleven) % 10;
    if (remainder_mod_ten === 0) {
      remainder_mod_ten = 10;
    }
    remainder_mod_eleven = (2 * remainder_mod_ten) % 11;
  }

  // Calculate the last digit based on the remainder modulo 11
  digit = 11 - remainder_mod_eleven;
  if (digit === 10) {
    digit = 0;
  }

  // Return the calculated digit
  return digit;
}
