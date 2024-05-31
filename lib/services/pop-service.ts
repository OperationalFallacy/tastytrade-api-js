import extractResponseData from "../utils/response-util";
import TastytradeHttpClient from "./tastytrade-http-client";

export interface Pop50Request {
  "current-stock-price": number;
  "histogram-ideal-range-count": number;
  "initial-cost": number;
  "initial-cost-effect": string;
  "interest-rate": number;
  "target-fraction-of-cost": number;
  volatility: number;
  legs: PopRequestLeg[];
}

export interface PopRequestLeg {
  action: "sell_to_open" | "buy_to_open" | "selltoopen" | "buytoopen";
  "asset-type": "Equity Option";
  "call-or-put": "P" | "C";
  "days-to-expiration": number;
  quantity: number;
  "strike-price": number;
  "contract-implied-volatility": number;
  "expiration-implied-volatility": number;
}
export interface Pop50ResponseData {
  "num-of-paths": number;
  "steps-per-day": number;
  "winner-count": number;
  "total-milliseconds-to-compute": number;
  "theoretical-cost": string;
  "theoretical-cost-effect": "Debit" | "Credit";
  "target-cost": string;
  "target-cost-effect": string;
  "conditional-value-at-risk-cost": string;
  "conditional-value-at-risk-cost-effect": string;
  "target-fraction-of-cost": string;
  "probability-of-making-target": string;
  "theoretical-price-movement-for-one-day": string;
  "theoretical-spot-price": string;
  "adjusted-implied-volatility-for-path": string;
  "time-adjusted-implied-volatility-for-path": string;
  "path-results": PathResult[];
  "price-histogram": PopPriceHistogram[];
  "winning-steps-histogram": PopWinningStepsHistogram[];
}

export interface Pop50Response {
  data: Pop50ResponseData;
  error?: Pop50ResponseError;
}
export interface Pop50ResponseError {
  message: string;
  errors: any[]; // You may want to define a more specific interface for these errors
}
 
export interface PathResult {
  cost: string;
  "cost-effect": "Debit" | "Credit";
  steps: number;
  "stock-price": string;
}

export interface PopPriceHistogram {
  low: string;
  high: string;
  count: number;
  "range-index": number;
}

export interface PopWinningStepsHistogram {
  low: string;
  high: string;
  count: number;
  "range-index": number;
}

export default class PopService {
  constructor(private httpClient: TastytradeHttpClient) {}

  /**
   * Get statistical estimation of 50% probability of profit
   * @param requestData
   * @returns {Pop50Response}
   */
  async get50Pop(requestData: Pop50Request): Promise<Pop50Response> {
    try {
      const popResponse = await this.httpClient.postData(
        "/fifty-percent-pop",
        requestData,
        {}
      );
      if(popResponse.data.error) {
        console.error("Error occurred during get50Pop");
        throw popResponse.data.error;
      }
      const s: Pop50ResponseData = extractResponseData(popResponse)

      return { data: s, error: popResponse.error } as Pop50Response;
    } catch (error:any) {
      console.error("Error occurred during get50Pop:", error.message);
      throw error;
    }
  }
}
