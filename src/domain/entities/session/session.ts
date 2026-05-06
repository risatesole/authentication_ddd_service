import Identifier from "../../valueObjects/Identifier/Identifier";
import DateTime from "../../valueObjects/datetime/DateTime";

/**
 * Entity representing a user authentication session.
 */
class Session {
  private readonly id: Identifier;
  private readonly userId: Identifier;
  private readonly createdAt: DateTime;
  private expiresAt: DateTime;
  private revoked: boolean;

  constructor(
    id: Identifier,
    userId: Identifier,
    expiresAt: DateTime
  ) {
    this.id = id;
    this.userId = userId;
    this.createdAt = DateTime.now();
    this.expiresAt = expiresAt;
    this.revoked = false;
  }

  getId(): Identifier {
    return this.id;
  }

  getUserId(): Identifier {
    return this.userId;
  }

  getCreatedAt(): DateTime {
    return this.createdAt;
  }

  getExpiresAt(): DateTime {
    return this.expiresAt;
  }

  isRevoked(): boolean {
    return this.revoked;
  }

  /**
   * Session is valid if not revoked and not expired
   */
  isValid(): boolean {
    return !this.revoked && DateTime.now().isBefore(this.expiresAt);
  }

  revoke(): void {
    this.revoked = true;
  }

  extend(newExpiresAt: DateTime): void {
    if (newExpiresAt.isAfter(this.expiresAt)) {
      this.expiresAt = newExpiresAt;
    }
  }

  equals(session: Session): boolean {
    return this.id.equals(session.getId());
  }

  static create(userId: Identifier, durationMs: number): Session {
    const id = new Identifier();
    const expiresAt = DateTime.now().addMilliseconds(durationMs);

    return new Session(id, userId, expiresAt);
  }
}

export default Session;