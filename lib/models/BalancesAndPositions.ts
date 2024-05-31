import { PRICE_EFFECTS } from "./OrderInterfaces.js";
export type QUANTITY_DIRECTION = "Short" | "Long";

export interface Position {
  "account-number": string;
  symbol: string;
  "instrument-type": string;
  "underlying-symbol": string;
  quantity: number;
  "quantity-direction": QUANTITY_DIRECTION;
  "close-price": string;
  "average-open-price": string;
  "average-yearly-market-close-price": string;
  "average-daily-market-close-price": string;
  multiplier: number;
  "cost-effect": PRICE_EFFECTS;
  "is-suppressed": boolean;
  "is-frozen": boolean;
  "restricted-quantity": number;
  "expires-at": string;
  "realized-day-gain": string;
  "realized-day-gain-effect": string;
  "realized-day-gain-date": string;
  "realized-today": string;
  "realized-today-effect": string;
  "realized-today-date": string;
  "created-at": Date;
  "updated-at": Date;
}

export type getPositionsListResponse = Position[];

export type INSTRUMENT =
  | "Bond"
  | "Cryptocurrency"
  | "Currency"
  | "Pair"
  | "Equity"
  | "Equity Offering"
  | "Equity Option"
  | "Future"
  | "Future Option"
  | "Index"
  | "Unknown"
  | "Warrant";

export interface getBalancesSnapshotResponse {
  "account-number": string;
  "cash-balance": number;
  "long-equity-value": number;
  "short-equity-value": number;
  "long-derivative-value": number;
  "short-derivative-value": number;
  "long-futures-value": number;
  "short-futures-value": number;
  "long-futures-derivative-value": number;
  "short-futures-derivative-value": number;
  "long-margineable-value": number;
  "short-margineable-value": number;
  "margin-equity": number;
  "equity-buying-power": number;
  "derivative-buying-power": number;
  "day-trading-buying-power": number;
  "futures-margin-requirement": number;
  "available-trading-funds": number;
  "maintenance-requirement": number;
  "maintenance-call-value": number;
  "reg-t-call-value": number;
  "day-trading-call-value": number;
  "day-equity-call-value": number;
  "net-liquidating-value": number;
  "cash-available-to-withdraw": number;
  "day-trade-excess": number;
  "pending-cash": number;
  "pending-cash-effect": string;
  "long-cryptocurrency-value": number;
  "short-cryptocurrency-value": number;
  "cryptocurrency-margin-requirement": number;
  "unsettled-cryptocurrency-fiat-amount": number;
  "unsettled-cryptocurrency-fiat-effect": string;
  "closed-loop-available-balance": number;
  "equity-offering-margin-requirement": number;
  "long-bond-value": number;
  "bond-margin-requirement": number;
  "used-derivative-buying-power": number;
  "snapshot-date": Date;
  "reg-t-margin-requirement": number;
  "futures-overnight-margin-requirement": number;
  "futures-intraday-margin-requirement": number;
  "maintenance-excess": number;
  "pending-margin-interest": number;
  "effective-cryptocurrency-buying-power": number;
  "updated-at": Date;
}
