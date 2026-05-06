import { test, expect } from "bun:test";
import FirstName from "../FirstName";

test("FirstName - accepts valid name", () => {
  const name = new FirstName("Henry");

  expect(name.getValue()).toBe("Henry");
});

test("FirstName - rejects invalid names", () => {
  expect(() => new FirstName("")).toThrow();
  expect(() => new FirstName("123")).toThrow();
  expect(() => new FirstName("@@@")).toThrow();
});

test("FirstName - trims input", () => {
  const name = new FirstName("  Henry  ");

  expect(name.getValue()).toBe("Henry");
});

test("FirstName - value is always a string", () => {
  const name = new FirstName("Henry");

  expect(typeof name.getValue()).toBe("string");
});