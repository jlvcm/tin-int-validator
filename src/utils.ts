/**
 * Remove any non-alphanumeric characters from a string.
 * @param str The input string.
 * @returns The input string with all non-alphanumeric characters removed.
 */
export function clearString(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Get the digit at a specific index in a string.
 * @param str The input string.
 * @param index The index of the digit to retrieve.
 * @returns The digit at the specified index.
 */
export function digitAt(str: string, index: number): number {
  return parseInt(str.charAt(index), 10);
}

/**
 * Get the last day of a month for a given year and month.
 * @param month The month (1-12).
 * @param year The year.
 * @returns The last day of the specified month and year.
 */
export function getLastDayOfMonth(month: number, year: number): number {
  const lastDayOfMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  if (month === 2 && isLeapYear) {
    return 29;
  }
  return lastDayOfMonth[month];
}

/**
 * Validate a date given a year, month, and day.
 * @param year The year.
 * @param month The month (1-12).
 * @param day The day (1-31).
 * @returns True if the date is valid, false otherwise.
 */
export function dateValidate(year: number, month: number, day: number): boolean {
  return month >= 1 && month <= 12 && day >= 1 && day <= getLastDayOfMonth(month, year);
}

/**
 * Calculate the sum of the digits of a number.
 * @param number The input number.
 * @returns The sum of the digits of the input number.
 * @throws An error if the input number is negative.
 */
export function sumDigit(number: number): number {
  const sNumber = number.toString();
  if (number < 0) {
    throw new Error('Parameter has to be positive.');
  }
  let sum = 0;
  for (const digit of sNumber) {
    sum += parseInt(digit, 10);
  }
  return sum;
}

/**
 * Get the last digit of a number.
 * @param number The input number.
 * @returns The last digit of the input number.
 * @throws An error if the input number is negative.
 */
export function getUnit(number: number): number {
  if (number < 0) {
    throw new Error('Parameter must be positive.');
  }
  const sNumber = number.toString();
  return parseInt(sNumber.charAt(sNumber.length - 1), 10);
}

/**
 * Check if a value is within a range.
 * @param value The value to check.
 * @param minValue The minimum value of the range (exclusive).
 * @param maxValue The maximum value of the range (exclusive).
 * @returns True if the value is within the range, false otherwise.
 */
export function isInRange(value: number, minValue: number, maxValue: number): boolean {
  return value > minValue && value < maxValue;
}
