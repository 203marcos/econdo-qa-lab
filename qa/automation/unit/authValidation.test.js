const { normalizeEmail, isStrongPassword, isValidEmail } = require('../../../src/utils/authValidation');

describe('authValidation', () => {
  it('normalizes email with trim and lowercase', () => {
    expect(normalizeEmail('  QA.TESTE@ECONDO.COM  ')).toBe('qa.teste@econdo.com');
  });

  it('accepts valid email format', () => {
    expect(isValidEmail('qa.teste@econdo.com')).toBe(true);
  });

  it('rejects invalid email format', () => {
    expect(isValidEmail('qa-teste.com')).toBe(false);
  });

  it('accepts password with at least 8 chars', () => {
    expect(isStrongPassword('qa123456')).toBe(true);
  });

  it('accepts password with exactly 8 chars', () => {
    expect(isStrongPassword('12345678')).toBe(true);
  });

  it('rejects weak password', () => {
    expect(isStrongPassword('123')).toBe(false);
  });
});
