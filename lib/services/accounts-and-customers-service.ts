import type { quoteStreamerTokenResponse } from "../models/QuoteStreamer.js";
import extractResponseData from "../utils/response-util.js";
import TastytradeHttpClient from "./tastytrade-http-client.js";

export default class AccountsAndCustomersService {
    constructor(private httpClient: TastytradeHttpClient) {
    }
    async getCustomerAccounts(){
        const accountNumber = (await this.httpClient.getData('/customers/me/accounts', {}, {}))
        return extractResponseData(accountNumber)
    }

    //Customers: Operations about customers
    async getCustomerResource(){
        //Get a full customer resource.
        const customerResource = (await this.httpClient.getData(`/customers/me`, {}, {}))
        return extractResponseData(customerResource)
    }
    async getCustomerAccountResources(){
        //Get a list of all the customer account resources attached to the current customer.
        const customerAccountResources = (await this.httpClient.getData(`/customers/me/accounts`, {}, {}))
        return extractResponseData(customerAccountResources)
    }
    async getFullCustomerAccountResource(accountNumber: string){
        //Get a full customer account resource.
        const fullCustomerAccountResource = (await this.httpClient.getData(`/customers/me/accounts/${accountNumber}`, {}, {}))
        return extractResponseData(fullCustomerAccountResource)
    }

    //Quote-streamer-tokens: Operations about quote-streamer-tokens
    async getQuoteStreamerTokens():Promise<quoteStreamerTokenResponse>{
        //Returns the appropriate quote streamer endpoint, level and identification token for the current customer to receive market data.
        const quoteStreamerTokens = (await this.httpClient.getData('/quote-streamer-tokens', {}, {}))
        return extractResponseData(quoteStreamerTokens) as quoteStreamerTokenResponse;
    }

    //Returns the appropriate quote streamer endpoint, level and identification token for the current customer to receive market data.
    async getApiQuoteToken():Promise<quoteStreamerTokenResponse> {
        const apiQuoteToken = (await this.httpClient.getData('/api-quote-tokens', {}, {}))
        return extractResponseData(apiQuoteToken)
    }
}
