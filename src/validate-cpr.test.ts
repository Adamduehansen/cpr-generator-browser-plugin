import { validateCpr } from './validate-cpr';

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
