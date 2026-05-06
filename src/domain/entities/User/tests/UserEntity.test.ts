import { test, expect } from "bun:test";
import User from "../User";

import Identifier from "../../../value_objects/Identifier/Identifier";
import FirstName from "../../../value_objects/FirstName/FirstName";
import LastName from "../../../value_objects/LastName/LastName";
import Email from "../../../value_objects/email/Email";
import Password from "../../../value_objects/password/Password";

const createUser = () => {
  return new User(
    new Identifier(),
    new FirstName("Henry"),
    new LastName("Ramirez"),
    new Email("henry@test.com"),
    Password.create("Strong@123")
  );
};

test("UserEntity - creates user correctly", () => {
  const user = createUser();

  expect(user.getFirstName().getValue()).toBe("Henry");
  expect(user.getLastName().getValue()).toBe("Ramirez");
  expect(user.getEmail().getValue()).toBe("henry@test.com");
});
