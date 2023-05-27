import { validateTINByCountry, Countries } from '../src/index';

describe('validateTINByCountry', () => {
  it('should return false for undefined TIN', () => {
    expect(validateTINByCountry(undefined, Countries.Austria)).toBe(false);
  });

  it('should throw an error for invalid country', () => {
    expect(() => validateTINByCountry('123456789', 'XX' as Countries)).toThrowError('No validator for country XX');
  });

  it.todo('Czech Republic (NOT IMPLEMENTED)');

  it.todo('Greece (NOT IMPLEMENTED)');

  it.todo('Latvia (NOT IMPLEMENTED)');

  it.todo('Malta (NOT IMPLEMENTED)');

  it.todo('Romania (NOT IMPLEMENTED)');

  it.todo('Slovakia (NOT IMPLEMENTED)');

  describe('Austria', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('93-173/6581', Countries.Austria)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('12-456/7899', Countries.Austria)).toBe(false);
    });
  });

  describe('Belgium', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('00012511119', Countries.Belgium)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('00426811681', Countries.Belgium)).toBe(false);
    });
  });

  describe('Bulgaria', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('7501010010', Countries.Bulgaria)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('7501010011', Countries.Bulgaria)).toBe(false);
    });
  });

  describe('Croatia', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('94577403194', Countries.Croatia)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('94577403199', Countries.Croatia)).toBe(false);
    });
  });

  describe('Cyprus', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('99652156X', Countries.Cyprus)).toBe(true);
      expect(validateTINByCountry('00123123T', Countries.Cyprus)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('00123123F', Countries.Cyprus)).toBe(false);
    });
  });

  describe('Denmark', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('010111-1113', Countries.Denmark)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('010111-1114', Countries.Denmark)).toBe(false);
    });
  });

  describe('Estonia', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('37102250382', Countries.Estonia)).toBe(true);
      expect(validateTINByCountry('32708101201', Countries.Estonia)).toBe(true);
      expect(validateTINByCountry('46304280206', Countries.Estonia)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('46304280207', Countries.Estonia)).toBe(false);
    });
  });

  describe('Finland', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('131052-308T', Countries.Finland)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('131052-308Z', Countries.Finland)).toBe(false);
    });
  });

  describe('France', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('30 23 217 600 053', Countries.France)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('30 23 217 600 054', Countries.France)).toBe(false);
    });
  });

  describe('Germany', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('26954371827', Countries.Germany)).toBe(true);
      expect(validateTINByCountry('86095742719', Countries.Germany)).toBe(true);
      expect(validateTINByCountry('65929970489', Countries.Germany)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('65929970488', Countries.Germany)).toBe(false);
    });
  });

  describe('Hungary', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('8071592153', Countries.Hungary)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('8071592154', Countries.Hungary)).toBe(false);
    });
  });

  describe('Ireland', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('1234567T', Countries.Ireland)).toBe(true);
      expect(validateTINByCountry('1234567TW', Countries.Ireland)).toBe(true);
      expect(validateTINByCountry('1234577W', Countries.Ireland)).toBe(true);
      expect(validateTINByCountry('1234577WW', Countries.Ireland)).toBe(true);
      expect(validateTINByCountry('1234577IA', Countries.Ireland)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('1234567W', Countries.Ireland)).toBe(false);
      expect(validateTINByCountry('1234567W', Countries.Ireland)).toBe(false);
      expect(validateTINByCountry('1234577T', Countries.Ireland)).toBe(false);
      expect(validateTINByCountry('1234577TW', Countries.Ireland)).toBe(false);
      expect(validateTINByCountry('1234577T', Countries.Ireland)).toBe(false);
    });
  });

  describe('Italy', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('DMLPRY77D15H501F', Countries.Italy)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('DMLPRY77D15H501H', Countries.Italy)).toBe(false);
    });
  });

  describe('Lithuania', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('10101010005', Countries.Lithuania)).toBe(true);
      expect(validateTINByCountry('33309240064', Countries.Lithuania)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('10101010007', Countries.Lithuania)).toBe(false);
    });
  });

  describe('Luxembourg', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('1893120105732', Countries.Luxembourg)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('1893120105733', Countries.Luxembourg)).toBe(false);
    });
  });

  describe('Netherlands', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('174559434', Countries.Netherlands)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('174559436', Countries.Netherlands)).toBe(false);
    });
  });

  describe('Poland', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('02070803628', Countries.Poland)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('02070803629', Countries.Poland)).toBe(false);
    });
  });

  describe('Portugal', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('299999998', Countries.Portugal)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('299999999', Countries.Portugal)).toBe(false);
    });
  });
  describe('Slovenia', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('15012557', Countries.Slovenia)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('15012558', Countries.Slovenia)).toBe(false);
    });
  });

  describe('Spain', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('(000)54237A', Countries.Spain)).toBe(true);
      expect(validateTINByCountry('X1234567L', Countries.Spain)).toBe(true);
      expect(validateTINByCountry('Z1234567R', Countries.Spain)).toBe(true);
      expect(validateTINByCountry('M2812345C', Countries.Spain)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('(000)54237B', Countries.Spain)).toBe(false);
      expect(validateTINByCountry('X1234567X', Countries.Spain)).toBe(false);
      expect(validateTINByCountry('Z1234567F', Countries.Spain)).toBe(false);
      expect(validateTINByCountry('M2812345H', Countries.Spain)).toBe(false);
    });
  });

  describe('Sweden', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('640823-3234', Countries.Sweden)).toBe(true);
      expect(validateTINByCountry('640883-3231', Countries.Sweden)).toBe(true);
      expect(validateTINByCountry('19640823-3234', Countries.Sweden)).toBe(true);
      expect(validateTINByCountry('19640883-3231', Countries.Sweden)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('640823-3235', Countries.Sweden)).toBe(false);
      expect(validateTINByCountry('640883-3234', Countries.Sweden)).toBe(false);
      expect(validateTINByCountry('19640823-3232', Countries.Sweden)).toBe(false);
      expect(validateTINByCountry('19640883-3233', Countries.Sweden)).toBe(false);
    });
  });

  describe('United Kingdom', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('AA123456A', Countries.UnitedKingdom)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('AA123456E', Countries.UnitedKingdom)).toBe(false);
    });
  });
  describe('United Kingdom', () => {
    it('should return true for valid TIN', () => {
      expect(validateTINByCountry('123456789', Countries.UnitedStates)).toBe(true);
    });

    it('should return false for TIN with invalid TIN', () => {
      expect(validateTINByCountry('1234567890', Countries.UnitedStates)).toBe(false);
    });
  });
});
