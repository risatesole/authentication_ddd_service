class PasswordErrors {
  static weakPassword(): Error {
    return new Error(
      "Password must be at least 8 chars, include uppercase, lowercase, number and symbol"
    );
  }
}
export default PasswordErrors;
