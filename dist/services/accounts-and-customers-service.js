export default class AccountsAndCustomersService {
    httpClient;
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getCustomerAccounts() {
        const accountNumber = await this.httpClient.getData("/customers/me/accounts", {}, {});
        return accountNumber;
    }
    //Customers: Operations about customers
    async getCustomerResource() {
        //Get a full customer resource.
        const customerResource = await this.httpClient.getData(`/customers/me`, {}, {});
        return customerResource;
    }
    async getCustomerAccountResources() {
        //Get a list of all the customer account resources attached to the current customer.
        const customerAccountResources = await this.httpClient.getData(`/customers/me/accounts`, {}, {});
        return customerAccountResources;
    }
    async getFullCustomerAccountResource(accountNumber) {
        //Get a full customer account resource.
        const fullCustomerAccountResource = await this.httpClient.getData(`/customers/me/accounts/${accountNumber}`, {}, {});
        return fullCustomerAccountResource;
    }
    //Quote-streamer-tokens: Operations about quote-streamer-tokens
    async getQuoteStreamerTokens() {
        //Returns the appropriate quote streamer endpoint, level and identification token for the current customer to receive market data.
        const quoteStreamerTokens = await this.httpClient.getData("/quote-streamer-tokens", {}, {});
        const e = quoteStreamerTokens;
        return e;
    }
    //Returns the appropriate quote streamer endpoint, level and identification token for the current customer to receive market data.
    async getApiQuoteToken() {
        const apiQuoteToken = await this.httpClient.getData("/api-quote-tokens", {}, {});
        return apiQuoteToken;
    }
}
//# sourceMappingURL=accounts-and-customers-service.js.map