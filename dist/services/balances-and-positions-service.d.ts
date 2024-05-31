import type { getBalancesSnapshotResponse, getPositionsListResponse } from "../models/BalancesAndPositions.js";
import TastytradeHttpClient from "./tastytrade-http-client.js";
export default class BalancesAndPositionsService {
    private httpClient;
    constructor(httpClient: TastytradeHttpClient);
    getPositionsList(accountNumber: string, queryParams?: {}): Promise<getPositionsListResponse>;
    getAccountBalanceValues(accountNumber: string): Promise<any>;
    getBalanceSnapshots(accountNumber: string, queryParams?: {}): Promise<getBalancesSnapshotResponse>;
}
//# sourceMappingURL=balances-and-positions-service.d.ts.map