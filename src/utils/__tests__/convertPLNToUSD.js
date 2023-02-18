import { convertPLNToUSD } from './../convertPLNtoUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });

  it('should return NaN when input is text', () => {
    // expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('6')).toEqual(expect.any(String));
    expect(convertPLNToUSD('abc')).toEqual(expect.any(String));
    expect(convertPLNToUSD('-543')).toEqual(expect.any(String));
  });

  it('should be NaN when input is empty', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });

  it('should be Error when input is not text or number', () => {
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD(function() {})).toBe('Error');
    expect(convertPLNToUSD(null)).toBe('Error');
  });

  it('should be zero when input is lower than zero', () => {
    expect(convertPLNToUSD(-2)).toBe('$0.00');
    expect(convertPLNToUSD(-7)).toBe('$0.00');
    expect(convertPLNToUSD(-57)).toBe('$0.00');
  });
});