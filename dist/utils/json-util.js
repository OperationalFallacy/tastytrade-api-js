const isNil = (val) => val == null;
export class JsonBuilder {
    json;
    constructor(json = {}) {
        this.json = json;
    }
    add(key, value, serializeEmpty = false) {
        if ((isNil(value) || value === "") && !serializeEmpty) {
            return this;
        }
        this.json[key] = value;
        return this;
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function recursiveDasherizeKeys(body) {
    let dasherized = Object.fromEntries(Object.entries(body).map(([k, v]) => [dasherize(k), v]));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dasherized = Object.fromEntries(Object.entries(dasherized).map(([k, v]) => [
        k,
        v != null && typeof v === "object" && !Array.isArray(v)
            ? recursiveDasherizeKeys(v)
            : v,
    ]));
    return dasherized;
}
export function dasherize(target) {
    // prettier-ignore
    return target
        .replace(/([A-Z])/g, (_match, p1, _offset, _whole) => `-${p1.toLowerCase()}`)
        .replace(/\s/g, '-');
}
//# sourceMappingURL=json-util.js.map