class Identifier {
  private readonly value: string;

  constructor(value?: string) {
    if (!value) {
      this.value = crypto.randomUUID();
      return;
    }

    if (!Identifier.isValid(value)) {
      throw new Error("Invalid ID format");
    }

    this.value = value;
  }

  static isValid(value: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    return uuidRegex.test(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(id: Identifier): boolean {
    return this.value === id.getValue();
  }
}

export default Identifier;