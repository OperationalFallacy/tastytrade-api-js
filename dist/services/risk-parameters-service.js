export default class RiskParametersService {
    httpClient;
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    //Accounts: Operations about accounts
    async getEffectiveMarginRequirements(accountNumber, underlyingSymbol) {
        //Get effective margin requirements for account
        const effectiveMarginRequirements = await this.httpClient.getData(`/accounts/${accountNumber}/margin-requirements/${underlyingSymbol}/effective`, {}, {});
        return effectiveMarginRequirements;
    }
    async getPositionLimit(accountNumber) {
        //Get the position limit
        const positionLimit = await this.httpClient.getData(`/accounts/${accountNumber}/position-limit`, {}, {});
        return positionLimit;
    }
}
//# sourceMappingURL=risk-parameters-service.js.map