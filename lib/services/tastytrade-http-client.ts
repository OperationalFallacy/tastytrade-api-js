import TastytradeSession from "../models/tastytrade-session.js";
import { URL } from "url";
import { recursiveDasherizeKeys } from "../utils/json-util.js";

export default class TastytradeHttpClient {
  public readonly session: TastytradeSession;

  constructor(private readonly baseUrl: string) {
    this.session = new TastytradeSession();
  }

  private getDefaultHeaders(): any {
    const headers: { [key: string]: any } = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: this.session.authToken,
    };

    // Only set user agent if running in node
    if (typeof window === "undefined") {
      headers["User-Agent"] = "tastytrade-sdk-js";
    }

    return headers;
  }

  private async executeRequest(
    method: string,
    url: string,
    data: object = {},
    headers: object = {},
    params: object = {}
  ): Promise<any> {
    const dasherizedParams = recursiveDasherizeKeys(params);
    const dasherizedData = recursiveDasherizeKeys(data);
    const mergedHeaders = { ...headers, ...this.getDefaultHeaders() };

    const fullUrl = new URL(url, this.baseUrl);
    for (const [key, value] of Object.entries(dasherizedParams)) {
      if (Array.isArray(value)) {
        value.forEach((v) =>
          fullUrl.searchParams.append(`${key}[]`, String(v))
        );
      } else if (value !== undefined && value !== null) {
        fullUrl.searchParams.append(key, String(value));
      }
    }

    const response = await fetch(fullUrl.toString(), {
      method: method.toUpperCase(),
      headers: mergedHeaders,
      body:
        method.toLowerCase() !== "get" &&
        method.toLowerCase() !== "delete" &&
        Object.keys(dasherizedData).length > 0
          ? JSON.stringify(dasherizedData)
          : undefined,
    });

    const text = await response.text();
    const dataParsed = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw {
        status: response.status,
        statusText: response.statusText,
        data: dataParsed,
      };
    }

    return dataParsed;
  }

  async getData(
    url: string,
    headers: object = {},
    queryParams: object = {}
  ): Promise<any> {
    return this.executeRequest("get", url, {}, headers, queryParams);
  }

  async postData(url: string, data: object, headers: object): Promise<any> {
    return this.executeRequest("post", url, data, headers);
  }

  async putData(url: string, data: object, headers: object): Promise<any> {
    return this.executeRequest("put", url, data, headers);
  }

  async patchData(url: string, data: object, headers: object): Promise<any> {
    return this.executeRequest("patch", url, data, headers);
  }

  async deleteData(url: string, headers: object): Promise<any> {
    return this.executeRequest("delete", url, headers);
  }
}
