// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function extractResponseData(httpResponse) {
    if (httpResponse?.data?.data?.items !== undefined) {
        return httpResponse.data.data.items;
    }
    else if (httpResponse?.data?.data !== undefined) {
        return httpResponse.data.data;
    }
    else {
        return httpResponse;
    }
}
//# sourceMappingURL=response-util.js.map