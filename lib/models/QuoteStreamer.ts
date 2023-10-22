export interface quoteStreamerTokenResponse {
    token: string,
    'streamer-url'?: string; // deprecated
    'websocket-url'?: string; // deprecated
    'dxlink-url': string  // "wss://tasty-openapi-ws.dxfeed.com/realtime",
    level: string //'demo'
}