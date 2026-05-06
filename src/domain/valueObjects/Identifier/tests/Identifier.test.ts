import { test, expect } from "bun:test";
import Identifier from "../Identifier";

test("Identifier - generates UUID when no value is provided", () => {
  const id = new Identifier();

  expect(Identifier.isValid(id.getValue())).toBe(true);
});

test("Identifier - accepts valid UUID", () => {
  const raw = crypto.randomUUID();
  const id = new Identifier(raw);

  expect(id.getValue()).toBe(raw);
});

test("Identifier - rejects invalid UUID format", () => {
  expect(() => new Identifier("invalid-id")).toThrow();
  expect(() => new Identifier("123")).toThrow();
  expect(() => new Identifier("not-a-uuid")).toThrow();
});

test("Identifier - equals returns true for same value", () => {
  const raw = crypto.randomUUID();

  const id1 = new Identifier(raw);
  const id2 = new Identifier(raw);

  expect(id1.equals(id2)).toBe(true);
});

test("Identifier - equals returns false for different values", () => {
  const id1 = new Identifier();
  const id2 = new Identifier();

  expect(id1.equals(id2)).toBe(false);
});

