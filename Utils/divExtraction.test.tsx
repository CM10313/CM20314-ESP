import fillAgeDict, { fillIncomeDict, fillDict } from "./diversityExtraction";

describe('fillAgeDict', () => {
  it('fills age dictionary correctly', () => {
    const ageArray = ['20', '25', '30', '35', '45', '50', '55',"-1"];
    const ageDict = fillAgeDict(ageArray);
    expect(ageDict).toEqual({
      '18-20': 1,
      '21-25': 1,
      '26-30': 1,
      '31-40': 1,
      '41-45': 1,
      '46-50': 1,
      '50+': 1,
    });
  });

  it('handles invalid age values gracefully', () => {
    const ageArray = ['abc', '25', '30', '35', '45', '50', '55',"-1"];
    const ageDict = fillAgeDict(ageArray);
    expect(ageDict).toEqual({
      '18-20': 0,
      '21-25': 1,
      '26-30': 1,
      '31-40': 1,
      '41-45': 1,
      '46-50': 1,
      '50+': 1,
    });
  });
});

describe('fillIncomeDict', () => {
  it('fills income dictionary correctly', () => {
    const incomeArray = ['10000', '15000', '20000', '25000', '27000', '40000',"-1"];
    const incomeDict = fillIncomeDict(incomeArray);
    expect(incomeDict).toEqual({
      '0 - 10k': 1,
      '11 - 15k': 1,
      '16 - 20k': 1,
      '21 - 25k': 1,
      '25 - 30k': 1,
      '30k +': 1,
    });
  });

  it('handles invalid income values gracefully', () => {
    const incomeArray = ['abc', '15000', '20000', '25000', '27000', '40000',"-1"];
    const incomeDict = fillIncomeDict(incomeArray);
    expect(incomeDict).toEqual({
      '0 - 10k': 0,
      '11 - 15k': 1,
      '16 - 20k': 1,
      '21 - 25k': 1,
      '25 - 30k': 1,
      '30k +': 1,
    });
  });
});

describe('fillDict', () => {
  it('fills dictionary correctly', () => {
    const inputArray = ['apple', 'banana', 'apple', 'orange', 'banana', 'grape'];
    const dict = fillDict(inputArray);
    expect(dict).toEqual({
      Apple: 2,
      Banana: 2,
      Orange: 1,
      Grape: 1,
    });
  });

  it('handles empty input array', () => {
    const inputArray: string[] = [];
    const dict = fillDict(inputArray);
    expect(dict).toEqual({});
  });
});
