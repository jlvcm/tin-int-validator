/**
 * Validate a UK TIN.
 * @param tin The UK TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateUK(tin: string): boolean {
  let normalizedTIN = tin.replace('/', '');
  if (tin.length === 8) {
    normalizedTIN += ' ';
  }
  if (!followsLength1UK(normalizedTIN) && !followsLength2UK(normalizedTIN)) {
    return false;
  }
  if (
    (followsLength1UK(normalizedTIN) && !followsPattern1UK(normalizedTIN)) ||
    (followsLength2UK(normalizedTIN) && !followsPattern2UK(normalizedTIN))
  ) {
    return false;
  }
  return true;
}

/**
 * Check if a UK TIN follows the length rule 1.
 * @param tin The UK TIN to check.
 * @returns True if the TIN follows the length rule 1, false otherwise.
 */
function followsLength1UK(tin: string): boolean {
  return tin.length === 10;
}

/**
 * Check if a UK TIN follows the pattern rule 1.
 * @param tin The UK TIN to check.
 * @returns True if the TIN follows the pattern rule 1, false otherwise.
 */
function followsPattern1UK(tin: string): boolean {
  return /^\d{10}$/.test(tin);
}

/**
 * Check if a UK TIN follows the length rule 2.
 * @param tin The UK TIN to check.
 * @returns True if the TIN follows the length rule 2, false otherwise.
 */
function followsLength2UK(tin: string): boolean {
  return tin.length === 9;
}

/**
 * Check if a UK TIN follows the pattern rule 2.
 * @param tin The UK TIN to check.
 * @returns True if the TIN follows the pattern rule 2, false otherwise.
 */
function followsPattern2UK(tin: string): boolean {
  return (
    /^[a-ceg-hj-pr-tw-zA-CEG-HJ-PR-TW-Z][a-ceg-hj-npr-tw-zA-CEG-HJ-NPR-TW-Z]\d{6}[abcdABCD ]$/.test(tin) && followsStructureSubRule2UK(tin)
  );
}

/**
 * Check if a UK TIN follows the structure sub-rule 2.
 * @param tin The UK TIN to check.
 * @returns True if the TIN follows the structure sub-rule 2, false otherwise.
 */
function followsStructureSubRule2UK(tin: string): boolean {
  const c1c2 = tin.substring(0, 2).toUpperCase();
  return c1c2 !== 'GB' && c1c2 !== 'NK' && c1c2 !== 'TN' && c1c2 !== 'ZZ';
}
