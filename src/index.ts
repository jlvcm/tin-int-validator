import { validatorsByCountry } from './country';

export const enum Countries {
  Austria = 'AT',
  Belgium = 'BE',
  Bulgaria = 'BG',
  Croatia = 'HR',
  Cyprus = 'CY',
  Denmark = 'DK',
  Estonia = 'EE',
  Finland = 'FI',
  France = 'FR',
  Germany = 'DE',
  Hungary = 'HU',
  Ireland = 'IE',
  Italy = 'IT',
  Lithuania = 'LT',
  Luxembourg = 'LU',
  Netherlands = 'NL',
  Poland = 'PL',
  Portugal = 'PT',
  Slovenia = 'SI',
  Spain = 'ES',
  Sweden = 'SE',
  UnitedKingdom = 'UK',
  UnitedStates = 'US',
}

/**
 * Validates a Tax Identification Number (TIN) for a given country.
 * @param tin - The TIN to validate.
 * @param country - The country to validate the TIN for.
 * @returns  Whether the TIN is valid for the given country.
 * @throws {Error} If there is no validator for the given country.
 */
export function validateTINByCountry(tin: string | undefined, country: Countries): boolean {
  if (!tin) {
    return false;
  }
  const validator = validatorsByCountry[country];
  if (!validator) {
    throw new Error(`No validator for country ${country}`);
  }
  return validator(tin);
}
