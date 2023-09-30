import { EventType, IEvent } from '@dxfeed/api';
export declare const SupportedEventTypes: EventType[];
export default class QuoteStreamer {
    private readonly token;
    private readonly url;
    private feed;
    constructor(token: string, url: string);
    connect(): void;
    disconnect(): void;
    subscribe(dxfeedSymbol: string, eventHandler: (event: IEvent) => void): () => void;
}
