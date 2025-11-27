import CryptoJS from 'crypto-js';

const SECRET_KEY = 'brain-spark-secret-key-2024';

export const passwordUtils = {
  // Hash password using SHA-256
  async hashPassword(password) {
    try {
      const salt = CryptoJS.lib.WordArray.random(128/8).toString();
      const saltedPassword = password + salt;
      const hash = CryptoJS.SHA256(saltedPassword).toString();
      return `${salt}:${hash}`;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Failed to hash password');
    }
  },

  // Verify password
  async verifyPassword(plainPassword, hashedPassword) {
    try {
      const [salt, originalHash] = hashedPassword.split(':');
      const saltedPassword = plainPassword + salt;
      const computedHash = CryptoJS.SHA256(saltedPassword).toString();
      return computedHash === originalHash;
    } catch (error) {
      console.error('Error verifying password:', error);
      throw new Error('Failed to verify password');
    }
  }
};
