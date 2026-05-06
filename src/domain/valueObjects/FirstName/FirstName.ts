import FirstNameErrors from "./errors/FirstNameErrors";

/**
 * Value Object that represents a person's first name.
 *
 * Ensures:
 * - Only valid alphabetic names are accepted
 * - Value is immutable
 * - Input is normalized (trimmed)
 */
class FirstName {
  /**
   * Internal immutable value.
   */
  private readonly value: string;

  /**
   * Creates a validated FirstName value object.
   *
   * @param firstName - Raw input name
   * @throws Error if invalid name
   */
  constructor(firstName: string) {
    if (!FirstName.isValid(firstName)) {
      throw FirstNameErrors.invalid();
    }

    this.value = firstName.trim();
  }

  /**
   * Returns the first name value.
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Validates the first name.
   *
   * @internal Domain rule helper
   */
  private static isValid(name: string): boolean {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name) && name.trim().length > 0;
  }
}

export default FirstName;