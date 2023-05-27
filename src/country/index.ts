import { Countries } from '..';
import { validateAT } from './at.validator';
import { validateBE } from './be.validator';
import { validateBG } from './bg.validator';
import { validateCY } from './cy.validator';
import { validateDE } from './de.validator';
import { validateDK } from './dk.validator';
import { validateEE } from './ee.validator';
import { validateES } from './es.validator';
import { validateFI } from './fi.validator';
import { validateFR } from './fr.validator';
import { validateHR } from './hr.validator';
import { validateHU } from './hu.validator';
import { validateIE } from './ie.validator';
import { validateIT } from './it.validator';
import { validateLT } from './lt.validator';
import { validateLU } from './lu.validator';
import { validateNL } from './nl.validator';
import { validatePL } from './pl.validator';
import { validatePT } from './pt.validator';
import { validateSE } from './se.validator';
import { validateSI } from './si.validator';
import { validateUK } from './uk.validator';
import { validateUS } from './us.validator';

export const validatorsByCountry: { [key in Countries]: (ftin: string) => boolean } = {
  [Countries.Austria]: validateAT,
  [Countries.Belgium]: validateBE,
  [Countries.Bulgaria]: validateBG,
  [Countries.Croatia]: validateHR,
  [Countries.Cyprus]: validateCY,
  [Countries.Denmark]: validateDK,
  [Countries.Estonia]: validateEE,
  [Countries.Finland]: validateFI,
  [Countries.France]: validateFR,
  [Countries.Germany]: validateDE,
  [Countries.Hungary]: validateHU,
  [Countries.Ireland]: validateIE,
  [Countries.Italy]: validateIT,
  [Countries.Lithuania]: validateLT,
  [Countries.Luxembourg]: validateLU,
  [Countries.Netherlands]: validateNL,
  [Countries.Poland]: validatePL,
  [Countries.Portugal]: validatePT,
  [Countries.Slovenia]: validateSI,
  [Countries.Spain]: validateES,
  [Countries.Sweden]: validateSE,
  [Countries.UnitedKingdom]: validateUK,
  [Countries.UnitedStates]: validateUS,
};
