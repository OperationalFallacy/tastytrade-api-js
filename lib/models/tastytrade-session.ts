const isNil = (value: unknown): boolean => value == null;

export default class TastytradeSession {
  authToken: string | null = null;

  get isValid() {
    return !isNil(this.authToken);
  }

  clear() {
    this.authToken = null;
  }
}
