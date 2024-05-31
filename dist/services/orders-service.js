import extractResponseData from "../utils/response-util.js";
export default class OrderService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    //Orders: Allows an API client to view, filter, create, cancel and replace orders.
    async postReconfirmOrder(accountNumber, orderId) {
        //Reconfirm an order
        const reconfirmOrder = await this.httpClient.postData(`/accounts/${accountNumber}/orders/${orderId}/reconfirm`, {}, {});
        return extractResponseData(reconfirmOrder);
    }
    async replacementOrderDryRun(accountNumber, orderId, replacementOrder) {
        //Runs through preflights for cancel-replace and edit without routing
        const replacementOrderDryRun = await this.httpClient.postData(`/accounts/${accountNumber}/orders/${orderId}/dry-run`, replacementOrder, {});
        return extractResponseData(replacementOrderDryRun);
    }
    async getOrder(accountNumber, orderId) {
        //Returns an order based on the orderId
        const order = await this.httpClient.getData(`/accounts/${accountNumber}/orders/${orderId}`, {}, {});
        return extractResponseData(order);
    }
    async cancelOrder(accountNumber, orderId) {
        //Requests order cancellation
        const order = await this.httpClient.deleteData(`/accounts/${accountNumber}/orders/${orderId}`, {});
        return extractResponseData(order);
    }
    async cancelComplexOrder(accountNumber, orderId) {
        //Requests order cancellation
        const order = await this.httpClient.deleteData(`/accounts/${accountNumber}/complex-orders/${orderId}`, {});
        return extractResponseData(order);
    }
    async replaceOrder(accountNumber, orderId, replacementOrder) {
        //Replaces a live order with a new one. Subsequent fills of the original order will abort the replacement.
        const order = await this.httpClient.putData(`/accounts/${accountNumber}/orders/${orderId}`, replacementOrder, {});
        return extractResponseData(order);
    }
    async editOrder(accountNumber, orderId, order) {
        //Edit price and execution properties of a live order by replacement. Subsequent fills of the original order will abort the replacement.
        const orderResponse = await this.httpClient.patchData(`/accounts/${accountNumber}/orders/${orderId}`, order, {});
        return extractResponseData(orderResponse);
    }
    async getLiveOrders(accountNumber) {
        //Returns a list of live orders for the resource
        const liveOrders = await this.httpClient.getData(`/accounts/${accountNumber}/orders/live`, {}, {});
        return extractResponseData(liveOrders);
    }
    async getOrders(accountNumber, queryParams = {}) {
        //Returns a paginated list of the customer's orders (as identified by the provided authentication token) based on sort param. If no sort is passed in, it defaults to descending order.
        const orders = await this.httpClient.getData(`/accounts/${accountNumber}/orders`, {}, queryParams);
        return extractResponseData(orders);
    }
    async createOrder(accountNumber, order) {
        //Accepts a json document containing parameters to create an order for the client.
        const orderResponse = await this.httpClient.postData(`/accounts/${accountNumber}/orders`, order, {});
        return extractResponseData(orderResponse);
    }
    async createComplexOrder(accountNumber, order) {
        //Accepts a json document containing parameters to create an order for the client.
        const orderResponse = await this.httpClient.postData(`/accounts/${accountNumber}/complex-orders`, order, {});
        return extractResponseData(orderResponse);
    }
    async postOrderDryRun(accountNumber, order) {
        //Accepts a json document containing parameters to create an order and then runs the prefights without placing the order.
        const orderDryRun = await this.httpClient.postData(`/accounts/${accountNumber}/orders/dry-run`, order, {});
        return extractResponseData(orderDryRun);
    }
    async getLiveOrdersForCustomer(customerId) {
        //Returns a list of live orders for the resource
        const liveOrders = await this.httpClient.getData(`/customers/${customerId}/orders/live`, {}, {});
        return extractResponseData(liveOrders);
    }
    async getCustomerOrders(customerId, queryParams = {}) {
        //Returns a paginated list of the customer's orders (as identified by the provided authentication token) based on sort param. If no sort is passed in, it defaults to descending order.
        const customerOrders = await this.httpClient.getData(`/customers/${customerId}/orders`, {}, queryParams);
        return extractResponseData(customerOrders);
    }
}
//# sourceMappingURL=orders-service.js.map