class LastNameErrors {
  static invalid(): Error {
    return new Error("Invalid last name");
  }
}

export default LastNameErrors;