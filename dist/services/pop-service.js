import extractResponseData from "../utils/response-util.js";
export default class PopService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * Get statistical estimation of 50% probability of profit
     * @param requestData
     * @returns {Pop50Response}
     */
    async get50Pop(requestData) {
        try {
            const popResponse = await this.httpClient.postData("/fifty-percent-pop", requestData, {});
            if (popResponse.data.error) {
                console.error("Error occurred during get50Pop");
                throw popResponse.data.error;
            }
            const s = extractResponseData(popResponse);
            return { data: s, error: popResponse.error };
        }
        catch (error) {
            console.error("Error occurred during get50Pop:", error.message);
            throw error;
        }
    }
}
//# sourceMappingURL=pop-service.js.map