import { test, expect } from "bun:test";
import LastName from "../LastName";

test("LastName - accepts valid last name", () => {
  const lastName = new LastName("Ramirez");

  expect(lastName.getValue()).toBe("Ramirez");
});

test("LastName - rejects invalid last names", () => {
  expect(() => new LastName("")).toThrow();
  expect(() => new LastName("123")).toThrow();
  expect(() => new LastName("@@@")).toThrow();
});

test("LastName - trims input", () => {
  const lastName = new LastName("  Ramirez  ");

  expect(lastName.getValue()).toBe("Ramirez");
});

test("LastName - value is always a string", () => {
  const lastName = new LastName("Ramirez");

  expect(typeof lastName.getValue()).toBe("string");
});

