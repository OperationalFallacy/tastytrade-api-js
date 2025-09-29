export default class InstrumentsService {
    httpClient;
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    //Instruments: Allows an API client to fetch data about instruments.
    async getCryptocurrencies(symbols = []) {
        //Retrieve a set of cryptocurrencies given an array of one or more symbols.
        const queryParams = { symbol: symbols };
        const cryptocurrencies = await this.httpClient.getData(`/instruments/cryptocurrencies`, {}, queryParams);
        return cryptocurrencies;
    }
    async getSingleCryptocurrency(symbol) {
        //Retrieve a cryptocurrency given a symbol.
        const encodedSymbol = encodeURIComponent(symbol);
        const singleCryptocurrency = await this.httpClient.getData(`/instruments/cryptocurrencies/${encodedSymbol}`, {}, {});
        return singleCryptocurrency;
    }
    async getActiveEquities(queryParams = {}) {
        //Returns all active equities in a paginated fashion
        const activeEquities = await this.httpClient.getData(`/instruments/equities/active`, {}, queryParams);
        return activeEquities;
    }
    async getEquityDefinitions(queryParams = {}) {
        //Returns a set of equity definitions given an array of one or more symbols
        const equityDefinitions = await this.httpClient.getData(`/instruments/equities`, {}, queryParams);
        return equityDefinitions;
    }
    async getSingleEquity(symbol) {
        //Returns a single equity definition for the provided symbol
        const singleEquity = await this.httpClient.getData(`/instruments/equities/${symbol}`, {}, {});
        return singleEquity;
    }
    async getEquityOptions(symbols, active = true, withExpired = false) {
        if (!Array.isArray(symbols) || symbols.length === 0) {
            throw new Error("Symbols are required for InstrumentService.getEquityOptions");
        }
        //Returns a set of equity options given one or more symbols
        const queryParams = { symbols, active, withExpired };
        const equityOptions = await this.httpClient.getData(`/instruments/equity-options`, {}, queryParams);
        return equityOptions;
    }
    async getSingleEquityOption(symbol, queryParams = {}) {
        //Get equity option by symbol
        const singleOption = await this.httpClient.getData(`/instruments/equity-options/${symbol}`, {}, queryParams);
        return singleOption;
    }
    async getFutures(queryParams = {}) {
        //Returns a set of outright futures given an array of one or more symbols.
        const futures = await this.httpClient.getData(`/instruments/futures`, {}, queryParams);
        return futures;
    }
    async getSingleFuture(symbol) {
        //Returns an outright future given a symbol.
        const singleFuture = await this.httpClient.getData(`/instruments/futures/${symbol}`, {}, {});
        return singleFuture;
    }
    async getFutureOptionsProducts() {
        //Returns metadata for all supported future option products
        const futureOptionsProducts = await this.httpClient.getData(`/instruments/future-option-products`, {}, {});
        return futureOptionsProducts;
    }
    async getSingleFutureOptionProduct(exchange, rootSymbol) {
        //Get a future option product by exchange and root symbol
        const singleFutureOptionProduct = await this.httpClient.getData(`/instruments/future-option-products/${exchange}/${rootSymbol}`, {}, {});
        return singleFutureOptionProduct;
    }
    async getFutureOptions(queryParams = {}) {
        //Returns a set of future option(s) given an array of one or more symbols.
        //Uses TW symbology: [./ESZ9 EW4U9 190927P2975]
        const futureOptions = await this.httpClient.getData(`/instruments/future-options`, {}, queryParams);
        return futureOptions;
    }
    async getSingleFutureOption(symbol) {
        //Returns a future option given a symbol. Uses TW symbology: ./ESZ9 EW4U9 190927P2975
        const singleFutureOption = await this.httpClient.getData(`/instruments/future-options/${symbol}`, {}, {});
        return singleFutureOption;
    }
    async getFuturesProducts() {
        //Returns metadata for all supported futures products
        const futuresProducts = await this.httpClient.getData(`/instruments/future-products`, {}, {});
        return futuresProducts;
    }
    async getSingleFutureProduct(exchange, code) {
        //Get future product from exchange and product code
        const singleFutureProduct = await this.httpClient.getData(`/instruments/future-products/${exchange}/${code}`, {}, {});
        return singleFutureProduct;
    }
    async getQuantityDecimalPrecisions() {
        //Retrieve all quantity decimal precisions.
        const quantityDecimalPrecisions = await this.httpClient.getData(`/instruments/quantity-decimal-precisions`, {}, {});
        return quantityDecimalPrecisions;
    }
    async getWarrants(queryParams = {}) {
        //Returns a set of warrant definitions that can be filtered by parameters
        const warrants = await this.httpClient.getData(`/instruments/warrants`, {}, queryParams);
        return warrants;
    }
    async getSingleWarrant(symbol) {
        //Returns a single warrant definition for the provided symbol
        const singleWarrant = await this.httpClient.getData(`/instruments/warrants/${symbol}`, {}, {});
        return singleWarrant;
    }
    //Futures-option-chains: Allows an API client to fetch futures option chains.
    async getNestedFutureOptionChains(symbol) {
        //Returns a futures option chain given a futures product code in a nested form to minimize redundant processing
        const nestedFutureOptionChains = await this.httpClient.getData(`/futures-option-chains/${symbol}/nested`, {}, {});
        return nestedFutureOptionChains;
    }
    async getFutureOptionChain(symbol) {
        //Returns a futures option chain given a futures product code, i.e. ES
        const futureOptionChain = await this.httpClient.getData(`/futures-option-chains/${symbol}`, {}, {});
        return futureOptionChain;
    }
    //Option-chains: Allows an API client to fetch futures option chains.
    async getNestedOptionChain(symbol) {
        //Returns an option chain given an underlying symbol,
        //i.e. AAPL in a nested form to minimize redundant processing
        const nestedOptionChain = await this.httpClient.getData(`/option-chains/${symbol}/nested`, {}, {});
        return nestedOptionChain;
    }
    async getCompactOptionChain(symbol) {
        //Returns an option chain given an underlying symbol, i.e. AAPL in a compact form to minimize content size
        const compactOptionChain = await this.httpClient.getData(`/option-chains/${symbol}/compact`, {}, {});
        return compactOptionChain;
    }
    async getOptionChain(symbol) {
        //Returns an option chain given an underlying symbol, i.e. AAPL
        const optionChain = await this.httpClient.getData(`/option-chains/${symbol}`, {}, {});
        return optionChain;
    }
}
//# sourceMappingURL=instruments-service.js.map