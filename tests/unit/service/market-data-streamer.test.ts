import MarketDataStreamer, {
  MarketDataSubscriptionType,
} from "../../../lib/market-data-streamer";

describe("MarketDataStreamer", () => {
  let streamer: MarketDataStreamer;

  beforeEach(() => {
    streamer = new MarketDataStreamer();
  });

  it("handles AUTH_STATE message", () => {
    const spy = jest.spyOn<any, any>(streamer as any, "handleAuthStateMessage");
    // Stub openFeedChannel to prevent actual execution and dependency on isConnected
    (streamer as any).openFeedChannel = jest.fn();
    const authMessage = JSON.stringify({
      type: "AUTH_STATE",
      state: "AUTHORIZED",
    });

    (streamer as any).handleMessageReceived({ data: authMessage });

    expect(spy).toHaveBeenCalledWith({
      type: "AUTH_STATE",
      state: "AUTHORIZED",
    });
  });

  it("handles CHANNEL_OPENED message", () => {
    const spy = jest.spyOn<any, any>(streamer as any, "handleChannelOpened");
    const channelMessage = JSON.stringify({
      type: "CHANNEL_OPENED",
      channel: 1,
    });

    (streamer as any).handleMessageReceived({ data: channelMessage });

    expect(spy).toHaveBeenCalledWith({ type: "CHANNEL_OPENED", channel: 1 });
  });

  it("notifies data listeners on FEED_DATA message", () => {
    const feedMessage = JSON.stringify({
      type: "FEED_DATA",
      channel: 1,
      payload: "test",
    });

    const mockListener = jest.fn();
    streamer.addDataListener(mockListener);

    (streamer as any).handleMessageReceived({ data: feedMessage });

    expect(mockListener).toHaveBeenCalledWith({
      type: "FEED_DATA",
      channel: 1,
      payload: "test",
    });
  });
});
