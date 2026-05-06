import LastNameErrors from "./errors/LastNameErrors";

/**
 * Value Object that represents a person's last name.
 *
 * Ensures:
 * - Only valid alphabetic names are accepted
 * - Value is immutable
 * - Input is normalized (trimmed)
 */
class LastName {
  /**
   * Internal immutable value.
   */
  private readonly value: string;

  /**
   * Creates a validated LastName value object.
   *
   * @param lastName - Raw input last name
   * @throws Error if invalid name
   */
  constructor(lastName: string) {
    if (!LastName.isValid(lastName)) {
      throw LastNameErrors.invalid();
    }

    this.value = lastName.trim();
  }

  /**
   * Returns the last name value.
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Validates last name input.
   *
   * @internal Domain rule helper
   */
  private static isValid(name: string): boolean {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name) && name.trim().length > 0;
  }
}

export default LastName;
