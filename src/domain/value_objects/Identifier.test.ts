import { test, expect } from "bun:test";
import Identifier from "./Identifier";

test("Id - generates valid UUID when no value is provided", () => {
  const id = new Identifier();

  expect(Identifier.isValid(id.getValue())).toBe(true);
});

test("Id - accepts valid UUID string", () => {
  const raw = crypto.randomUUID();
  const id = new Identifier(raw);

  expect(id.getValue()).toBe(raw);
});

test("Id - throws error for invalid format", () => {
  expect(() => new Identifier("invalid-id")).toThrow("Invalid ID format");
});

test("Id - equals returns true for same value", () => {
  const raw = crypto.randomUUID();

  const id1 = new Identifier(raw);
  const id2 = new Identifier(raw);

  expect(id1.equals(id2)).toBe(true);
});

test("Id - equals returns false for different values", () => {
  const id1 = new Identifier();
  const id2 = new Identifier();

  expect(id1.equals(id2)).toBe(false);
});