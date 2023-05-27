import { clearString, dateValidate } from '../utils';

const LENGTH = 11;
const PATTENR = /^\d{2}[0-1]\d[0-3]\d{6}$/;

/**
 * Validate a Belgian TIN.
 * @param tin The Belgian TIN to validate.
 * @returns True if the TIN is valid, false otherwise.
 */
export function validateBE(tin: string): boolean {
  const str = clearString(tin);
  if (str.length !== LENGTH) {
    return false;
  }
  const resultDateValidation = isValidDate(str);
  if (resultDateValidation === 0 || !PATTENR.test(tin)) {
    return false;
  }
  if (!followsRules(str, resultDateValidation)) {
    return false;
  }
  return true;
}

/**
 * Check if a Belgian TIN follows the Belgium rule 1 and is valid.
 * @param tin The Belgian TIN to check.
 * @param resultDateValidation The result of validating the date in the TIN.
 * @returns True if the TIN follows Belgium rule 1 and is valid, false otherwise.
 */
function followsBelgiumRule1AndIsDateValid(tin: string, resultDateValidation: number): boolean {
  return followsBelgiumRule1(tin) && (resultDateValidation === 1 || resultDateValidation === 3);
}

/**
 * Check if a Belgian TIN follows the Belgium rule 2 and is valid.
 * @param tin The Belgian TIN to check.
 * @param resultDateValidation The result of validating the date in the TIN.
 * @returns True if the TIN follows Belgium rule 2 and is valid, false otherwise.
 */
function followsBelgiumRule2AndIsDateValid(tin: string, resultDateValidation: number): boolean {
  return followsBelgiumRule2(tin) && resultDateValidation >= 2;
}

/**
 * Check if a Belgian TIN follows Belgium rule 1.
 * @param tin The Belgian TIN to check.
 * @returns True if the TIN follows Belgium rule 1, false otherwise.
 */
function followsBelgiumRule1(tin: string): boolean {
  const divisionRemainderBy97 = parseInt(tin.substring(0, 9), 10) % 97;
  return 97 - divisionRemainderBy97 === parseInt(tin.substring(9, 11), 10);
}

/**
 * Check if a Belgian TIN follows Belgium rule 2.
 * @param tin The Belgian TIN to check.
 * @returns True if the TIN follows Belgium rule 2, false otherwise.
 */
function followsBelgiumRule2(tin: string): boolean {
  const divisionRemainderBy97 = (2 + parseInt(tin.substring(0, 9), 10)) % 97;
  return 97 - divisionRemainderBy97 === parseInt(tin.substring(9, 11), 10);
}

/**
 * Validate the date in a Belgian TIN.
 * @param tin The Belgian TIN to validate.
 * @returns 0 if the date is invalid, 1 if the date is valid for the 1900s, 2 if the date is valid for the 2000s, 3 if the date is valid for both centuries.
 */
function isValidDate(tin: string): number {
  try {
    const year = parseInt(tin.substring(0, 2), 10);
    const month = parseInt(tin.substring(2, 4), 10);
    const day = parseInt(tin.substring(4, 6), 10);
    if (day === 0 || month === 0 || (dateValidate(1900 + year, month, day) && dateValidate(2000 + year, month, day))) {
      return 3;
    }
    if (dateValidate(1900 + year, month, day)) {
      return 1;
    }
    if (dateValidate(2000 + year, month, day)) {
      return 2;
    }
    return 0;
  } catch (e) {
    return 0;
  }
}

/**
 * Check if a Belgian TIN follows any of the Belgium rules and is valid.
 * @param tin The Belgian TIN to check.
 * @param resultDateValidation The result of validating the date in the TIN.
 * @returns True if the TIN follows any of the Belgium rules and is valid, false otherwise.
 */
function followsRules(tin: string, resultDateValidation: number): boolean {
  return followsBelgiumRule1AndIsDateValid(tin, resultDateValidation) || followsBelgiumRule2AndIsDateValid(tin, resultDateValidation);
}
