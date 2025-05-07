import TastytradeSession from "../models/tastytrade-session.js";
import { URL } from "url";
import { recursiveDasherizeKeys } from "../utils/json-util.js";
import { fetch } from "undici";
export default class TastytradeHttpClient {
    baseUrl;
    session;
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.session = new TastytradeSession();
    }
    getDefaultHeaders() {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(this.session.authToken
                ? { Authorization: this.session.authToken }
                : {}),
        };
        // Only set user agent if running in node
        if (typeof window === "undefined") {
            headers["User-Agent"] = "tastytrade-sdk-js";
        }
        return headers;
    }
    async executeRequest(method, url, data = {}, headers = {}, params = {}) {
        const dasherizedParams = recursiveDasherizeKeys(params);
        const dasherizedData = recursiveDasherizeKeys(data);
        const mergedHeaders = Object.fromEntries(Object.entries({ ...headers, ...this.getDefaultHeaders() }).filter(([_, v]) => v !== undefined));
        const fullUrl = new URL(url, this.baseUrl);
        for (const [key, value] of Object.entries(dasherizedParams)) {
            if (Array.isArray(value)) {
                value.forEach((v) => fullUrl.searchParams.append(`${key}[]`, String(v)));
            }
            else if (value !== undefined && value !== null) {
                fullUrl.searchParams.append(key, String(value));
            }
        }
        const response = await fetch(fullUrl.toString(), {
            method: method.toUpperCase(),
            headers: mergedHeaders,
            body: method.toLowerCase() !== "get" &&
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
    async getData(url, headers = {}, queryParams = {}) {
        return this.executeRequest("get", url, {}, headers, queryParams);
    }
    async postData(url, data, headers) {
        return this.executeRequest("post", url, data, headers);
    }
    async putData(url, data, headers) {
        return this.executeRequest("put", url, data, headers);
    }
    async patchData(url, data, headers) {
        return this.executeRequest("patch", url, data, headers);
    }
    async deleteData(url, headers) {
        return this.executeRequest("delete", url, headers);
    }
}
//# sourceMappingURL=tastytrade-http-client.js.map