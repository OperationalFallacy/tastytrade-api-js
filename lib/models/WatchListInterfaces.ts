export interface watchListReplaceRequest {
  data: watchListEntries;
  "api-version": string;
  context: string;
}

interface watchListEntries {
  name: string;
  "watchlist-entries": watchListEntry[];
  "order-index": number;
}

export type Instrument = 'Future' | 'Equity' | 'EquityOption'

interface watchListEntry {
  symbol: string;
  "instrument-type": Instrument;
}
