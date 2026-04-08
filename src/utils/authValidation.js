function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function isValidEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(normalizedEmail);
}

function isStrongPassword(password) {
  const normalizedPassword = String(password || '');
  return normalizedPassword.length >= 8;
}

module.exports = {
  normalizeEmail,
  isValidEmail,
  isStrongPassword,
};
