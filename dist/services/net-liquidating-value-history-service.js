export default class NetLiquidatingValueHistoryService {
    httpClient;
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    //Default
    async getNetLiquidatingValueHistory(accountNumber, queryParams = {}) {
        //Returns a list of account net liquidating value snapshots.
        const netLiquidatingValueHistory = await this.httpClient.getData(`/accounts/${accountNumber}/net-liq/history`, {}, queryParams);
        return netLiquidatingValueHistory;
    }
    async getNetLiquidatingValue(accountNumber) {
        //Returns a list of account net liquidating value snapshots.
        const netLiquidatingValue = await this.httpClient.getData(`/accounts/${accountNumber}/net-liq`);
        return netLiquidatingValue;
    }
}
//# sourceMappingURL=net-liquidating-value-history-service.js.map