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

const resetNumber = function (number: number) {
  if (number > 9) {
    return 0;
  } else {
    return number;
  }
};

const isMaxSerialNummer = function (serialNumber: number[]) {
  return (
    serialNumber[3] === 9 &&
    serialNumber[2] === 9 &&
    serialNumber[1] === 9 &&
    serialNumber[0] === 9
  );
};

const sanitizeYear = function (year: string): string {
  if (year.length === 4) {
    year = year.substr(2);
  }
  return year;
};

const sanitizeMonth = function (month: string): string {
  if (month.length === 1) {
    month = `0${month}`;
  }
  return month;
};

const sanitizeDay = function (day: string): string {
  if (day.length === 1) {
    day = `0${day}`;
  }
  return day;
};

const sanitizeInputs = function ({ day, month, year }: CprDate): CprDate {
  return {
    day: sanitizeDay(day),
    month: sanitizeMonth(month),
    year: sanitizeYear(year),
  };
};

export const generateCprs = function (inputs: CprDate): Promise<string[]> {
  const { day, month, year } = sanitizeInputs(inputs);
  const validCprs: string[] = [];
  return new Promise<string[]>((resolve) => {
    const serialNumbers = [0, 0, 0, 0];
    do {
      if (serialNumbers[3] <= 9) {
        serialNumbers[3] += 1;
      } else {
        serialNumbers[3] = 0;
      }

      if (serialNumbers[3] > 9 && serialNumbers[2] <= 9) {
        serialNumbers[2] += 1;
      }

      if (serialNumbers[2] > 9 && serialNumbers[1] <= 9) {
        serialNumbers[1] += 1;
      }

      if (serialNumbers[1] > 9 && serialNumbers[0] <= 9) {
        serialNumbers[0] += 1;
      }

      serialNumbers[3] = resetNumber(serialNumbers[3]);
      serialNumbers[2] = resetNumber(serialNumbers[2]);
      serialNumbers[1] = resetNumber(serialNumbers[1]);
      serialNumbers[0] = resetNumber(serialNumbers[0]);

      const cpr = day + month + year + serialNumbers.join('');
      const isValid = validateCpr(cpr);
      if (isValid) {
        validCprs.push(cpr);
      }

      if (isMaxSerialNummer(serialNumbers)) {
        break;
      }
    } while (
      serialNumbers[3] <= 9 &&
      serialNumbers[2] <= 9 &&
      serialNumbers[1] <= 9 &&
      serialNumbers[0] <= 9
    );

    resolve(validCprs);
  });
};
