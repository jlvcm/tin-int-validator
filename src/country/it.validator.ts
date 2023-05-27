import { dateValidate } from '../utils';
import ITIdList from '../ITIdList';

/**
 * Regular expression pattern for validating the Italian TIN.
 */
const PATTERN =
  /[a-zA-Z]{6}[LMNPQRSTUVlmnpqrstuv0-9]{2}[ABCDEHLMPRSTabcdehlmprst]([0Ll][1-9]|[1Mm2Nn4Qq5Rr6Ss][0-9]|[3Pp7Tt][0-1])[a-zA-Z][LMNPQRSTUVlmnpqrstuv0-9]{3}[a-zA-Z]/;

/**
 * Set of valid codes for result date validation.
 */
let listSet: Set<string> = ITIdList;

/**
 * Sets the result date validation codes.
 * @param set - The set of codes.
 */
export function setResultDateValidation(set: Set<string>) {
  listSet = set;
}

/**
 * Validates an Italian TIN (Tax Identification Number).
 * @param tin - The TIN to validate.
 * @returns A boolean indicating whether the TIN is valid.
 */
export function validateIT(tin: string): boolean {
  if (!followsLength(tin)) {
    return false;
  }
  if (!followsPattern(tin) || !isValidDate(tin)) {
    return false;
  }
  if (!followsRules(tin)) {
    return false;
  }
  return true;
}

/**
 * Checks if the TIN follows the expected length.
 * @param tin - The TIN to check.
 * @returns A boolean indicating whether the TIN follows the expected length.
 */
function followsLength(tin: string): boolean {
  return tin.length === 16;
}

/**
 * Checks if the TIN follows the expected pattern and codes.
 * @param tin - The TIN to check.
 * @returns A boolean indicating whether the TIN follows the expected pattern and codes.
 */
function followsPattern(tin: string): boolean {
  const code = tin.substring(11, 12) + convertCharToNumber(tin.substring(12, 15));
  return (listSet.has(code.toUpperCase()) || listSet.has(code.toLowerCase())) && PATTERN.test(tin);
}

/**
 * Checks if the TIN follows the specific rules.
 * @param tin - The TIN to check.
 * @returns A boolean indicating whether the TIN follows the specific rules.
 */
function followsRules(tin: string): boolean {
  return followsRuleItalia(tin);
}

/**
 * Checks if the TIN follows the rules specific to Italy.
 * @param tin - The TIN to check.
 * @returns A boolean indicating whether the TIN follows the rules specific to Italy.
 */
function followsRuleItalia(tin: string): boolean {
  let sum = 0;
  for (let i = 0; i < 15; ++i) {
    if (i % 2 === 0) {
      sum += convertOddCharacter(tin.charAt(i));
    } else {
      sum += convertEvenCharacter(tin.charAt(i));
    }
  }
  const remainderBy26 = sum % 26;
  const c16 = tin.charAt(15);
  return convertRemainder(remainderBy26) === c16.toUpperCase();
}

/**
 * Converts an even character of the TIN to a number.
 * @param c - The character to convert.
 * @returns The converted number.
 */
function convertEvenCharacter(c: string): number {
  if (c.match(/\d/)) {
    return parseInt(c, 10);
  }
  if (c.match(/[a-z]/)) {
    return 0 + (c.charCodeAt(0) - 'a'.charCodeAt(0));
  }
  if (c.match(/[A-Z]/)) {
    return 0 + (c.charCodeAt(0) - 'A'.charCodeAt(0));
  }
  return -1;
}

/**
 * Converts an odd character of the TIN to a number.
 * @param c - The character to convert.
 * @returns The converted number.
 */
function convertOddCharacter(c: string): number {
  const normalizedChar = c.toLowerCase();
  switch (normalizedChar) {
    case '0':
    case 'a':
      return 1;
    case '1':
    case 'b':
      return 0;
    case '2':
    case 'c':
      return 5;
    case '3':
    case 'd':
      return 7;
    case '4':
    case 'e':
      return 9;
    case '5':
    case 'f':
      return 13;
    case '6':
    case 'g':
      return 15;
    case '7':
    case 'h':
      return 17;
    case '8':
    case 'i':
      return 19;
    case '9':
    case 'j':
      return 21;
    case 'k':
      return 2;
    case 'l':
      return 4;
    case 'm':
      return 18;
    case 'n':
      return 20;
    case 'o':
      return 11;
    case 'p':
      return 3;
    case 'q':
      return 6;
    case 'r':
      return 8;
    case 's':
      return 12;
    case 't':
      return 14;
    case 'u':
      return 16;
    case 'v':
      return 10;
    case 'w':
      return 22;
    case 'x':
      return 25;
    case 'y':
      return 24;
    case 'z':
      return 23;
    default:
      return -1;
  }
}

/**
 * Converts a remainder number to the corresponding character.
 * @param c - The remainder number.
 * @returns The corresponding character.
 */
function convertRemainder(c: number): string {
  return String.fromCharCode(65 + c);
}

/**
 * Converts the month character to its corresponding number.
 * @param m - The month character.
 * @returns The corresponding month number.
 */
function getMonthNumber(m: string): number {
  switch (m.toUpperCase()) {
    case 'A':
      return 1;
    case 'B':
      return 2;
    case 'C':
      return 3;
    case 'D':
      return 4;
    case 'E':
      return 5;
    case 'H':
      return 6;
    case 'L':
      return 7;
    case 'M':
      return 8;
    case 'P':
      return 9;
    case 'R':
      return 10;
    case 'S':
      return 11;
    case 'T':
      return 12;
    default:
      return -1;
  }
}

/**
 * Checks if the birth date in the TIN is a valid date.
 * @param tin - The TIN to check.
 * @returns A boolean indicating whether the birth date in the TIN is a valid date.
 */
function isValidDate(tin: string): boolean {
  try {
    const day = parseInt(convertCharToNumber(tin.substring(9, 11)), 10);
    const c9 = tin.charAt(8);
    const month = getMonthNumber(c9);
    const year = parseInt(convertCharToNumber(tin.substring(6, 8)), 10);
    if (day >= 1 && day <= 31) {
      return dateValidate(1900 + year, month, day) || dateValidate(2000 + year, month, day);
    }
    return day >= 41 && day <= 71 && (dateValidate(1900 + year, month, day - 40) || dateValidate(2000 + year, month, day - 40));
  } catch (e) {
    return false;
  }
}

/**
 * Converts characters in the TIN to their corresponding numbers.
 * @param oldStr - The string to convert.
 * @returns The converted string.
 */
function convertCharToNumber(oldStr: string): string {
  let newStr = '';
  for (let i = 0; i < oldStr.length; ++i) {
    if (oldStr[i].match(/[a-zA-Z]/)) {
      newStr += getNumberFromChar(oldStr[i]);
    } else {
      newStr += oldStr[i];
    }
  }
  return newStr;
}

/**
 * Converts a character in the TIN to its corresponding number.
 * @param m - The character to convert.
 * @returns The corresponding number.
 */
function getNumberFromChar(m: string): number {
  switch (m.toUpperCase()) {
    case 'L':
      return 0;
    case 'M':
      return 1;
    case 'N':
      return 2;
    case 'P':
      return 3;
    case 'Q':
      return 4;
    case 'R':
      return 5;
    case 'S':
      return 6;
    case 'T':
      return 7;
    case 'U':
      return 8;
    case 'V':
      return 9;
    default:
      return -1;
  }
}

// Load properties from IT_ID_list.properties
// const props = Properties;
// const set = new Set(Object.keys(props));
// setResultDateValidation(set);
