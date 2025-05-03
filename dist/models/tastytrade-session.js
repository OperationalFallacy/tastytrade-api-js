const isNil = (value) => value == null;
export default class TastytradeSession {
    authToken = null;
    get isValid() {
        return !isNil(this.authToken);
    }
    clear() {
        this.authToken = null;
    }
}
//# sourceMappingURL=tastytrade-session.js.map