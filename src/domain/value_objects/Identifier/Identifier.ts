/**
 * Value Object that represents a unique identifier (UUID).
 *
 * This class ensures:
 * - A valid UUID format if provided
 * - Automatic generation if no value is passed
 * - Immutability of the identifier
 *
 * It is used to guarantee consistent identity across domain entities.
 */
import IdentifierErrors from "./errors/IdentifierErrors";

class Identifier {
  /**
   * Internal immutable identifier value.
   */
  private readonly value: string;

  /**
   * Creates a new Identifier.
   *
   * If no value is provided, a new UUID is generated automatically.
   * If a value is provided, it must be a valid UUID.
   *
   * @param value - Optional UUID string
   * @throws Error if the provided value is not a valid UUID
   */
  constructor(value?: string) {
    if (!value) {
      this.value = crypto.randomUUID();
      return;
    }

    if (!Identifier.isValid(value)) {
      throw IdentifierErrors.invalid();
    }

    this.value = value;
  }

  /**
   * Validates whether a string is a valid UUID (v4).
   *
   * @param value - UUID string to validate
   * @returns True if valid UUID, false otherwise
   * @internal Domain validation helper
   */
  static isValid(value: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    return uuidRegex.test(value);
  }

  /**
   * Returns the identifier value.
   *
   * @returns UUID string
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Compares two Identifier instances for equality.
   *
   * @param id - Another Identifier instance
   * @returns True if both identifiers are equal
   */
  equals(id: Identifier): boolean {
    return this.value === id.getValue();
  }
}

export default Identifier;
