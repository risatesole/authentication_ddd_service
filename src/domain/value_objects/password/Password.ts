import PasswordErrors from "./errors/PasswordErrors";

class Password {
  private readonly hash: string;

  constructor(password: string) {
    if (!Password.isStrong(password)) {
      throw PasswordErrors.weakPassword();
    }

    this.hash = Password.hash(password);
  }

  private static isStrong(password: string): boolean {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  }

  private static hash(password: string): string {
    return Bun.password.hashSync(password, {
      algorithm: "bcrypt",
      cost: 10,
    });
  }

  static verify(password: string, hash: string): boolean {
    return Bun.password.verifySync(password, hash);
  }

  getHash(): string {
    return this.hash;
  }
}

export default Password;
