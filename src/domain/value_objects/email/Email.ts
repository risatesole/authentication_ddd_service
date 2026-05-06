import EmailErrors from "./errors/EmailErrors";

class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!Email.isValid(email)) {
      throw EmailErrors.invalidFormat();
    }

    this.value = email.toLowerCase();
  }

  /**
   * Returns the email value
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Validates email format
   */
  private static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

export default Email;