const convertCprStringToDigits = function (cpr: string): number[] {
  return cpr.split('').map((digit) => {
    return parseInt(digit);
  });
};

export const validateCpr = function (cpr: string): boolean {
  const digitisInCpr = convertCprStringToDigits(cpr);
  const multiplierSequence = [4, 3, 2, 7, 6, 5, 4, 3, 2, 1];
  const result = digitisInCpr.reduce((previousValue, currentValue, index) => {
    return previousValue + currentValue * multiplierSequence[index];
  }, 0);

  return result % 11 === 0;
};
