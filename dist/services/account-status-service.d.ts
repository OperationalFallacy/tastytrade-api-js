import { accountStatusResponse } from "../models/AccountStatus";
import TastytradeHttpClient from "./tastytrade-http-client";
export default class AccountStatusService {
    private httpClient;
    constructor(httpClient: TastytradeHttpClient);
    getAccountStatus(accountNumber: string): Promise<accountStatusResponse>;
}
