export abstract class NamedError extends Error {
  constructor(message: string | undefined, name: string) {
    super(message);
    this.name = name;
  }
}
