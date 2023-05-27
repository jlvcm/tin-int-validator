const LENGTH = 10;

const PATTERN = /^8\d{9}$/;

/**
 * Validate a Hungarian TIN.
 * @param tin The Hungarian TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateHU(tin: string): boolean {
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
 * Check if a Hungarian TIN follows the Hungary rule.
 * @param tin The Hungarian TIN to check.
 * @returns True if the TIN follows the Hungary rule, false otherwise.
 */
function followsRules(tin: string): boolean {
  // Get the check digit
  const c10 = parseInt(tin.charAt(9), 10);

  // Calculate the sum of the products of the digits and their weights
  let sum = 0;
  for (let i = 0; i < 9; ++i) {
    const c11 = parseInt(tin.substring(i, i + 1), 10);
    sum += c11 * (i + 1);
  }

  // Calculate the remainder of the sum divided by 11
  const remainderBy11 = sum % 11;

  // Check if the TIN is valid based on the remainder and check digit
  return remainderBy11 === c10;
}
