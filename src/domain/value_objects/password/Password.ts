import PasswordErrors from "./errors/PasswordErrors";

/**
 * Value Object that represents a securely hashed password.
 *
 * This class ensures:
 * - Password strength validation
 * - Secure hashing using Bun's bcrypt implementation
 * - Safe creation from either plain text or stored hash
 *
 * The plain password is never stored in memory.
 */
class Password {
  /**
   * The internal hashed password representation.
   * This is the only stored value in the object.
   */
  private readonly hashed: string;

  /**
   * Private constructor to enforce controlled creation.
   *
   * @param hashedPassword - A bcrypt-hashed password string
   */
  private constructor(hashedPassword: string) {
    this.hashed = hashedPassword;
  }

  /**
   * Creates a new Password from a plain text password.
   *
   * This method:
   * - Validates password strength
   * - Hashes the password securely
   * - Returns a Password value object
   *
   * @param plain - Plain text password
   * @throws Error if password does not meet strength requirements
   * @returns Password instance
   */
  static create(plain: string): Password {
    if (!Password.isStrong(plain)) {
      throw PasswordErrors.weakPassword();
    }

    const hash = Password.hash(plain);
    return new Password(hash);
  }

  /**
   * Recreates a Password object from a stored hash.
   *
   * This is typically used when loading a user from a database.
   *
   * @param hash - Previously hashed password
   * @returns Password instance
   */
  static fromHash(hash: string): Password {
    return new Password(hash);
  }

  /**
   * Returns the hashed password value.
   *
   * @returns bcrypt hashed password string
   */
  value(): string {
    return this.hashed;
  }

  /**
   * Verifies a plain password against a stored hash.
   *
   * @param plain - Plain text password to verify
   * @param hash - Stored bcrypt hash
   * @returns true if password matches, false otherwise
   */
  static verify(plain: string, hash: string): boolean {
    return Bun.password.verifySync(plain, hash);
  }

  /**
   * Hashes a plain password using bcrypt.
   *
   * @param password - Plain text password
   * @returns bcrypt hashed password
   * @internal This method is private and should not be used outside this class
   */
  private static hash(password: string): string {
    return Bun.password.hashSync(password, {
      algorithm: "bcrypt",
      cost: 10,
    });
  }

  /**
   * Validates password strength rules.
   *
   * Requirements:
   * - At least 8 characters
   * - At least one uppercase letter
   * - At least one lowercase letter
   * - At least one number
   * - At least one special character
   *
   * @param password - Plain text password
   * @returns true if password is strong enough
   * @internal This is a domain rule helper
   */
  private static isStrong(password: string): boolean {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  }
}

export default Password;
