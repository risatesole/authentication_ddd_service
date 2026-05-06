import FirstName from "../../valueObjects/FirstName/FirstName";
import LastName from "../../valueObjects/LastName/LastName";
import Email from "../../valueObjects/email/Email";
import Password from "../../valueObjects/password/Password";
import Identifier from "../../valueObjects/Identifier/Identifier";
import DateTime from "../../valueObjects/datetime/DateTime";

/**
 * Entity representing a User in the domain.
 *
 * A User is defined by:
 * - a unique Identifier
 * - validated value objects (name, email, password)
 * - lifecycle metadata (createdAt)
 */
class User {
  private readonly identifier: Identifier;
  private readonly createdAt: DateTime;

  private firstName: FirstName;
  private lastName: LastName;
  private email: Email;
  private password: Password;

  constructor(
    identifier: Identifier,
    firstName: FirstName,
    lastName: LastName,
    email: Email,
    password: Password,
    createdAt: DateTime 
  ) {
    this.identifier = identifier;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt ?? DateTime.now();
  }

  getIdentifier(): Identifier {
    return this.identifier;
  }

  getCreatedAt(): DateTime {
    return this.createdAt;
  }

  getFirstName(): FirstName {
    return this.firstName;
  }

  getLastName(): LastName {
    return this.lastName;
  }

  getEmail(): Email {
    return this.email;
  }

  getPassword(): Password {
    return this.password;
  }

  changeEmail(newEmail: Email): void {
    this.email = newEmail;
  }

  changeName(firstName: FirstName, lastName: LastName): void {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  changePassword(newPassword: Password): void {
    this.password = newPassword;
  }

  equals(user: User): boolean {
    return this.identifier.equals(user.getIdentifier());
  }

  /**
   * Factory method for creating a new User
   */
  static create(
    firstName: FirstName,
    lastName: LastName,
    email: Email,
    password: Password
  ): User {
    return new User(
      new Identifier(),
      firstName,
      lastName,
      email,
      password,
      DateTime.now()
    );
  }
}

export default User;