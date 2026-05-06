class IdentifierErrors {
  static invalid(): Error {
    return new Error("Invalid ID format");
  }
}

export default IdentifierErrors;