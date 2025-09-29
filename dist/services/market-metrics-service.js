export default class MarketMetricsService {
    httpClient;
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    //Default
    async getMarketMetrics(queryParams = {}) {
        //Returns an array of volatility data for given symbols.
        const marketMetrics = await this.httpClient.getData("/market-metrics", {}, queryParams);
        return marketMetrics;
    }
    async getHistoricalDividendData(symbol) {
        //Get historical dividend data
        const historicalDividendData = await this.httpClient.getData(`/market-metrics/historic-corporate-events/dividends/${symbol}`, {}, {});
        return historicalDividendData;
    }
    async getHistoricalEarningsData(symbol, queryParams = {}) {
        //Get historical earnings data
        const historicalEarningsData = await this.httpClient.getData(`/market-metrics/historic-corporate-events/earnings-reports/${symbol}`, {}, queryParams);
        return historicalEarningsData;
    }
}
//# sourceMappingURL=market-metrics-service.js.map