import type { accountStatusResponse } from "../models/AccountStatus.js";
import TastytradeHttpClient from "./tastytrade-http-client.js";
export default class AccountStatusService {
    private httpClient;
    constructor(httpClient: TastytradeHttpClient);
    getAccountStatus(accountNumber: string): Promise<accountStatusResponse>;
}
