import type { DateTimeInterface } from "./interfaces/DateTimeInterface";

class DateTime implements DateTimeInterface {
  private readonly value: Date;

  private constructor(date: Date) {
    this.value = new Date(date.getTime());
  }

  static now(): DateTime {
    return new DateTime(new Date());
  }

  static from(date: Date): DateTime {
    return new DateTime(date);
  }

  toDateTime(): Date {
    return new Date(this.value.getTime());
  }

  addMilliseconds(ms: number): DateTime {
    return new DateTime(new Date(this.value.getTime() + ms));
  }

  isBefore(other: DateTimeInterface): boolean {
    return this.value.getTime() < other.toDateTime().getTime();
  }

  isAfter(other: DateTimeInterface): boolean {
    return this.value.getTime() > other.toDateTime().getTime();
  }

  equals(other: DateTimeInterface): boolean {
    return this.value.getTime() === other.toDateTime().getTime();
  }
}

export default DateTime;