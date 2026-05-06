import { test, expect } from "bun:test";
import Password from "../Password";

const strongPassword = "Strong@123";
const weakPassword = "123";

test("Password - rejects weak password", () => {
  expect(() => Password.create(weakPassword)).toThrow();
});

test("Password - creates hashed password from strong input", () => {
  const password = Password.create(strongPassword);

  expect(password.value()).toBeDefined();
  expect(password.value()).not.toBe(strongPassword);
});

test("Password - fromHash restores object correctly", () => {
  const password = Password.create(strongPassword);
  const hash = password.value();

  const restored = Password.fromHash(hash);

  expect(restored.value()).toBe(hash);
});

test("Password - verify returns true for correct password", () => {
  const password = Password.create(strongPassword);

  expect(Password.verify(strongPassword, password.value())).toBe(true);
});

test("Password - verify returns false for wrong password", () => {
  const password = Password.create(strongPassword);

  expect(Password.verify("Wrong@123", password.value())).toBe(false);
});

test("Password - value is always a non-empty string", () => {
  const password = Password.create(strongPassword);

  expect(typeof password.value()).toBe("string");
  expect(password.value().length).toBeGreaterThan(0);
});