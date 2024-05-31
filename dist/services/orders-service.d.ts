import type { OrderResponse, submitOrderResponse } from "../models/OrderInterfaces.js";
import TastytradeHttpClient from "./tastytrade-http-client.js";
export default class OrderService {
    private httpClient;
    constructor(httpClient: TastytradeHttpClient);
    postReconfirmOrder(accountNumber: string, orderId: number): Promise<any>;
    replacementOrderDryRun(accountNumber: string, orderId: number, replacementOrder: object): Promise<any>;
    getOrder(accountNumber: string, orderId: number): Promise<any>;
    cancelOrder(accountNumber: string, orderId: number): Promise<OrderResponse>;
    cancelComplexOrder(accountNumber: string, orderId: number): Promise<any>;
    replaceOrder(accountNumber: string, orderId: number, replacementOrder: object): Promise<any>;
    editOrder(accountNumber: string, orderId: number, order: object): Promise<any>;
    getLiveOrders(accountNumber: string): Promise<any>;
    getOrders(accountNumber: string, queryParams?: {}): Promise<OrderResponse[]>;
    createOrder(accountNumber: string, order: object): Promise<submitOrderResponse>;
    createComplexOrder(accountNumber: string, order: object): Promise<any>;
    postOrderDryRun(accountNumber: string, order: object): Promise<submitOrderResponse>;
    getLiveOrdersForCustomer(customerId: string): Promise<any>;
    getCustomerOrders(customerId: string, queryParams?: {}): Promise<any>;
}
