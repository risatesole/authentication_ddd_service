export interface DateTimeInterface {
  toDateTime(): Date;

  addMilliseconds(ms: number): DateTimeInterface;

  isBefore(other: DateTimeInterface): boolean;
  isAfter(other: DateTimeInterface): boolean;
  equals(other: DateTimeInterface): boolean;
}