import { test, expect } from "bun:test";
import Email from "../Email";

test("Email - accepts valid email", () => {
  const email = new Email("test@example.com");

  expect(email.getValue()).toBe("test@example.com");
});

test("Email - rejects invalid email formats", () => {
  expect(() => new Email("invalid-email")).toThrow();
  expect(() => new Email("test@")).toThrow();
  expect(() => new Email("@test.com")).toThrow();
});

test("Email - normalizes email to lowercase", () => {
  const email = new Email("TEST@EXAMPLE.COM");

  expect(email.getValue()).toBe("test@example.com");
});

test("Email - value is always a string", () => {
  const email = new Email("user@domain.com");

  expect(typeof email.getValue()).toBe("string");
});