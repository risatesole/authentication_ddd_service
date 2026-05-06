import EmailErrors from "./errors/EmailErrors";

/**
 * Value Object that represents a validated email address.
 *
 * This class ensures:
 * - Email format validation on creation
 * - Normalized lowercase storage
 * - Immutable value after creation
 *
 * If the email is invalid, an EmailError is thrown.
 */
class Email {
  /**
   * Internal normalized email value.
   */
  private readonly value: string;

  /**
   * Creates a new Email value object.
   *
   * Validates the email format and normalizes it to lowercase.
   *
   * @param email - Raw email string
   * @throws Error if the email format is invalid
   */
  constructor(email: string) {
    if (!Email.isValid(email)) {
      throw EmailErrors.invalidFormat();
    }

    this.value = email.toLowerCase();
  }

  /**
   * Returns the normalized email value.
   *
   * @returns Email string in lowercase format
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Validates whether a string is a valid email format.
   *
   * Uses a basic regex pattern for validation:
   * - Must contain local part
   * - Must contain '@'
   * - Must contain domain and extension
   *
   * @param email - Email string to validate
   * @returns True if valid, false otherwise
   * @internal This is a domain rule helper and should not be used externally
   */
  private static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

export default Email;
