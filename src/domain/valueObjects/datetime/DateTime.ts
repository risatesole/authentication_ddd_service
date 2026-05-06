/**
 * Value Object representing a point in time.
 *
 * Ensures:
 * - Immutable date handling
 * - Safe comparisons
 * - Controlled creation
 */
class DateTime {
  private readonly value: Date;

  /**
   * Creates a DateTime instance.
   *
   * @param date - JavaScript Date object
   */
  private constructor(date: Date) {
    this.value = new Date(date.getTime()); // ensure immutability
  }

  /**
   * Creates a DateTime from current time.
   */
  static now(): DateTime {
    return new DateTime(new Date());
  }

  /**
   * Creates a DateTime from a JS Date.
   */
  static from(date: Date): DateTime {
    return new DateTime(date);
  }

  /**
   * Returns underlying Date (copy)
   */
  toDate(): Date {
    return new Date(this.value.getTime());
  }

  /**
   * Adds milliseconds
   */
  addMilliseconds(ms: number): DateTime {
    return new DateTime(new Date(this.value.getTime() + ms));
  }

  /**
   * Checks if this is before another DateTime
   */
  isBefore(other: DateTime): boolean {
    return this.value.getTime() < other.value.getTime();
  }

  /**
   * Checks if this is after another DateTime
   */
  isAfter(other: DateTime): boolean {
    return this.value.getTime() > other.value.getTime();
  }

  /**
   * Equality check
   */
  equals(other: DateTime): boolean {
    return this.value.getTime() === other.value.getTime();
  }
}

export default DateTime;