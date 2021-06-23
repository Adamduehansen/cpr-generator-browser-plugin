const convertCprStringToDigits = function (cpr: string): number[] {
  return cpr.split('').map((digit) => {
    return parseInt(digit);
  });
};

export type CprDate = {
  day: string;
  month: string;
  year: string;
};

export const validateCpr = function (cpr: string): boolean {
  const digitisInCpr = convertCprStringToDigits(cpr);
  const multiplierSequence = [4, 3, 2, 7, 6, 5, 4, 3, 2, 1];
  const result = digitisInCpr.reduce((previousValue, currentValue, index) => {
    return previousValue + currentValue * multiplierSequence[index];
  }, 0);

  return result % 11 === 0;
};

export const generateCprs = function ({
  day,
  month,
  year,
}: CprDate): Promise<string[]> {
  const validCprs: string[] = [];
  return new Promise<string[]>((resolve) => {
    const digits = [0, 0, 0, 0];
    do {
      if (digits[3] <= 9) {
        digits[3] += 1;
      } else {
        digits[3] = 0;
      }

      if (digits[3] > 9 && digits[2] <= 9) {
        digits[2] += 1;
      }

      if (digits[2] > 9 && digits[1] <= 9) {
        digits[1] += 1;
      }

      if (digits[1] > 9 && digits[0] <= 9) {
        digits[0] += 1;
      }

      if (digits[3] > 9) {
        digits[3] = 0;
      }

      if (digits[2] > 9) {
        digits[2] = 0;
      }

      if (digits[1] > 9) {
        digits[1] = 0;
      }

      if (digits[0] > 9) {
        digits[0] = 0;
      }

      const cpr = day + month + year + digits.join('');
      const isValid = validateCpr(cpr);
      if (isValid) {
        validCprs.push(cpr);
      }

      if (
        digits[3] === 9 &&
        digits[2] === 9 &&
        digits[1] === 9 &&
        digits[0] === 9
      ) {
        break;
      }
    } while (
      digits[3] <= 9 &&
      digits[2] <= 9 &&
      digits[1] <= 9 &&
      digits[0] <= 9
    );

    resolve(validCprs);
  });
};
