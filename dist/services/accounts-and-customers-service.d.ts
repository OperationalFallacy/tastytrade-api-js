import type { quoteStreamerTokenResponse } from "../models/QuoteStreamer.js";
import TastytradeHttpClient from "./tastytrade-http-client.js";
export default class AccountsAndCustomersService {
    private httpClient;
    constructor(httpClient: TastytradeHttpClient);
    getCustomerAccounts(): Promise<any>;
    getCustomerResource(): Promise<any>;
    getCustomerAccountResources(): Promise<any>;
    getFullCustomerAccountResource(accountNumber: string): Promise<any>;
    getQuoteStreamerTokens(): Promise<quoteStreamerTokenResponse>;
    getApiQuoteToken(): Promise<quoteStreamerTokenResponse>;
}
//# sourceMappingURL=accounts-and-customers-service.d.ts.map