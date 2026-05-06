class EmailErrors {
  static invalidFormat(): Error {
    return new Error("Invalid email format");
  }
}

export default EmailErrors;