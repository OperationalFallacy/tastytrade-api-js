// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function extractResponseData(httpResponse) {
    try {
        if (typeof httpResponse === "object" &&
            typeof httpResponse.data === "object" &&
            Array.isArray(httpResponse.data.items)) {
            return httpResponse.data.items;
        }
        if (typeof httpResponse === "object" &&
            typeof httpResponse.data === "object" &&
            typeof httpResponse.data.data === "object" &&
            "items" in httpResponse.data.data) {
            return httpResponse.data.data.items;
        }
        if (typeof httpResponse === "object" &&
            typeof httpResponse.data === "object" &&
            typeof httpResponse.data.data === "object") {
            return httpResponse.data.data;
        }
        if (typeof httpResponse === "object" &&
            typeof httpResponse.data === "object") {
            return httpResponse.data;
        }
    }
    catch {
        // fallthrough
    }
    return httpResponse;
}
//# sourceMappingURL=response-util.js.map