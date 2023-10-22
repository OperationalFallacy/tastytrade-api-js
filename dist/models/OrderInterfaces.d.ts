export declare type PRICE_EFFECTS = "Debit" | "Credit";
export declare type ORDER_TYPE = "Limit";
export declare type ORDER_ACTIONS = "Sell to Open" | "Sell to Close" | "Buy to Open" | "Buy to Close";
export declare type FEES_EFFECT = "Debit" | 'Credit';
export declare type TIME_IN_FORCE = "Day" | "GTC";
declare type ORDER_STATUS = "Live" | "Received" | "Cancelled" | "Routed" | "In Flight" | "Live Order" | "Cancel Requested" | "Contingent" | "Filled" | "Expired" | "Rejected" | "Removed" | "Partially Removed" | "Removed";
interface orderResponseBase {
    "api-version": string;
    context: string;
}
export interface OrderLeg {
    "instrument-type": string;
    symbol: string;
    quantity: number;
    action: ORDER_ACTIONS;
    "remaining-quantity"?: number;
}
export interface submitOrderRequest {
    source?: string;
    "time-in-force": TIME_IN_FORCE;
    "order-type": ORDER_TYPE;
    price: number;
    "account-number": string;
    "underlying-symbol"?: string;
    "price-effect": PRICE_EFFECTS;
    legs: OrderLeg[];
}
interface submitOrderResponseLeg extends OrderLeg {
    fills: any[];
}
export interface submitOrderResponseErrorBase {
    code: string;
    message: string;
    errors: submitOrderResponseError[];
}
export interface submitOrderResponseError {
    code: string;
    message: string;
}
export interface submitOrderResponse extends orderResponseBase {
    data: submitOrderResponseData;
    error?: submitOrderResponseErrorBase;
}
interface submitOrderResponseWarning {
    code: string;
    message: string;
}
export interface submitOrderResponseData {
    order: OrderResponse;
    warnings: submitOrderResponseWarning[];
    "buying-power-effect": submitOrderResponseBuyingPowerEffect;
    "fee-calculation": submitOrderResponseFeeCalculation;
}
export interface OrderResponse {
    id: number;
    "account-number": string;
    "time-in-force": TIME_IN_FORCE;
    "order-type": ORDER_TYPE;
    size: number;
    "underlying-symbol": string;
    price: number;
    "price-effect": PRICE_EFFECTS;
    status: ORDER_STATUS;
    cancellable: boolean;
    editable: boolean;
    edited: boolean;
    "received-at": string;
    "updated-at": number;
    legs: submitOrderResponseLeg[];
}
interface submitOrderResponseBuyingPowerEffect {
    "change-in-margin-requirement": number;
    "change-in-margin-requirement-effect": PRICE_EFFECTS;
    "change-in-buying-power": number;
    "change-in-buying-power-effect": PRICE_EFFECTS;
    "current-buying-power": number;
    "current-buying-power-effect": PRICE_EFFECTS;
    "new-buying-power": number;
    "new-buying-power-effect": PRICE_EFFECTS;
    "isolated-order-margin-requirement": number;
    "isolated-order-margin-requirement-effect": PRICE_EFFECTS;
    "is-spread": boolean;
    impact: string;
    effect: PRICE_EFFECTS;
}
interface submitOrderResponseFeeCalculation {
    "regulatory-fees": string;
    "regulatory-fees-effect": FEES_EFFECT;
    "clearing-fees": string;
    "clearing-fees-effect": FEES_EFFECT;
    commission: string;
    "commission-effect": FEES_EFFECT;
    "proprietary-index-option-fees": string;
    "proprietary-index-option-fees-effect": FEES_EFFECT;
    "total-fees": string;
    "total-fees-effect": FEES_EFFECT;
}
export interface liveOrderResponse extends orderResponseBase {
    data: liveOrderResponseData;
}
interface liveOrderResponseData {
    items: liveOrderResponseItem[];
}
interface liveOrderResponseItem {
    id: number;
    "account-number": string;
    "time-in-force": TIME_IN_FORCE;
    "order-type": ORDER_TYPE;
    size: number;
    "underlying-symbol": string;
    price: number;
    "price-effect": PRICE_EFFECTS;
    status: ORDER_STATUS;
    cancellable: boolean;
    editable: boolean;
    edited: boolean;
    legs: submitOrderResponseLeg[];
}
export {};
