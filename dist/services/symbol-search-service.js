export default class SymbolSearchService {
    httpClient;
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    //Default
    async getSymbolData(symbol) {
        //Returns an array of symbol data.
        const symbolData = await this.httpClient.getData(`/symbols/search/${symbol}`, {}, {});
        return symbolData;
    }
}
//# sourceMappingURL=symbol-search-service.js.map