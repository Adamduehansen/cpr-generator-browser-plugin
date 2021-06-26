import { validateCpr } from './cpr';
import { generateCprs } from './cpr';

describe('cpr', () => {
  describe('validateCpr', () => {
    test('should return true when cpr meets the modules 11 rule', () => {
      // Arrange
      const cpr = '1111111118';

      // Act
      const result = validateCpr(cpr);

      // Assert
      expect(result).toBeTruthy();
    });

    test('should return false when cpr does not meet the modules 11 rule', () => {
      // Arrange
      const cpr = '1412961245';

      // Act
      const result = validateCpr(cpr);

      // Assert
      expect(result).toBeFalsy();
    });
  });

  describe('generateCpr', () => {
    test.each([
      // ['1', '6', '1900'],
      ['01', '06', '00'],
    ])(
      'should generate CPR for day, month and year',
      async (day, month, year) => {
        // Act
        const cprs = await generateCprs({
          day,
          month,
          year,
        });

        // Assert
        expect(cprs).toHaveLength(909);
      },
      5000
    );
  });
});
