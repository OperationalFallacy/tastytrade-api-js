const isNil = (val: unknown): boolean => val == null;

export type BasicJsonValue = boolean | number | string | null | undefined;
export type JsonValue = BasicJsonValue | JsonArray | JsonMap;
export interface JsonMap {
  [key: string]: JsonValue | undefined;
}
export type JsonArray = JsonValue[];

export class JsonBuilder {
  public constructor(public readonly json: JsonMap = {}) {}

  public add(key: string, value: JsonValue, serializeEmpty = false): this {
    if ((isNil(value) || value === "") && !serializeEmpty) {
      return this;
    }

    this.json[key] = value;
    return this;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function recursiveDasherizeKeys(body: any) {
  let dasherized = Object.fromEntries(
    Object.entries(body).map(([k, v]) => [dasherize(k), v])
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dasherized = Object.fromEntries(
    Object.entries(dasherized).map(([k, v]) => [
      k,
      v != null && typeof v === "object" && !Array.isArray(v)
        ? recursiveDasherizeKeys(v)
        : v,
    ])
  );

  return dasherized;
}

export function dasherize(target: string): string {
  // prettier-ignore
  return target
    .replace(/([A-Z])/g, (_match, p1: string, _offset, _whole) => `-${p1.toLowerCase()}`)
    .replace(/\s/g, '-')
}
