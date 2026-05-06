import { test, expect } from "bun:test";
import Password from "../Password";

const strongPassword = "Strong@123";
const weakPassword = "123";

test("Password - rejects weak password", () => {
  expect(() => Password.create(weakPassword)).toThrow();
});

test("Password - creates hashed password from strong input", () => {
  const password = Password.create(strongPassword);

  expect(password.getValue()).toBeDefined();
  expect(password.getValue()).not.toBe(strongPassword);
});

test("Password - fromHash restores object correctly", () => {
  const password = Password.create(strongPassword);
  const hash = password.getValue();

  const restored = Password.fromHash(hash);

  expect(restored.getValue()).toBe(hash);
});

test("Password - verify returns true for correct password", () => {
  const password = Password.create(strongPassword);

  expect(Password.verify(strongPassword, password.getValue())).toBe(true);
});

test("Password - verify returns false for wrong password", () => {
  const password = Password.create(strongPassword);

  expect(Password.verify("Wrong@123", password.getValue())).toBe(false);
});

test("Password - value is always a non-empty string", () => {
  const password = Password.create(strongPassword);

  expect(typeof password.getValue()).toBe("string");
  expect(password.getValue().length).toBeGreaterThan(0);
});