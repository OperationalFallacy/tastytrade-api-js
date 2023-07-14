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

type Instrument = 'Future' | 'Equity'

interface watchListEntry {
  symbol: string;
  "instrument-type": Instrument;
}
