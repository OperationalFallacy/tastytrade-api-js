import { quoteStreamerTokenResponse } from "../models/QuoteStreamer";
import TastytradeHttpClient from "./tastytrade-http-client";
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
