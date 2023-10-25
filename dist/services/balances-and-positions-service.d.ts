import { getBalancesSnapshotResponse, getPositionsListResponse } from "../models";
import TastytradeHttpClient from "./tastytrade-http-client";
export default class BalancesAndPositionsService {
    private httpClient;
    constructor(httpClient: TastytradeHttpClient);
    getPositionsList(accountNumber: string, queryParams?: {}): Promise<getPositionsListResponse>;
    getAccountBalanceValues(accountNumber: string): Promise<any>;
    getBalanceSnapshots(accountNumber: string, queryParams?: {}): Promise<getBalancesSnapshotResponse>;
}
