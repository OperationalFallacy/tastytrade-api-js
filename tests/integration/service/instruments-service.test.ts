import InstrumentsService from "../../../lib/services/instruments-service";
import TastytradeHttpClient from "../../../lib/services/tastytrade-http-client";
import SessionService from "../../../lib/services/session-service";

const isNil = (val: unknown): boolean => val == null;

const client = new TastytradeHttpClient(process.env.BASE_URL!);
const instrumentsService = new InstrumentsService(client);

beforeAll(async () => {
  const sessionService = new SessionService(client);
  await sessionService.login(
    process.env.API_USERNAME!,
    process.env.API_PASSWORD!
  );
});

describe("getCryptocurrencies", () => {
  it("responds with the correct data", async function () {
    const response = await instrumentsService.getCryptocurrencies();
    expect(response).toBeDefined();
  });
});

describe("getSingleCryptocurrency", () => {
  it("responds with the correct data", async function () {
    const cryptocurrencySymbol = "BTC/USD";
    const response = await instrumentsService.getSingleCryptocurrency(
      cryptocurrencySymbol
    );
    expect(response.symbol).toBe(cryptocurrencySymbol);
  });
});

describe("getSingleEquity", () => {
  it("responds with the correct data", async function () {
    const equitySymbol = "AAPL";
    const response = await instrumentsService.getSingleEquity(equitySymbol);
    expect(response).toBeDefined();
    expect(response.symbol).toBe(equitySymbol);
  });
});

describe("getFutureOptionsProducts", () => {
  it("responds with the correct data", async function () {
    const response = await instrumentsService.getFutureOptionsProducts();
    expect(response.length).toBeGreaterThan(0);
    expect(response).toBeDefined();
  });
});

describe("getSingleFutureOptionProduct", () => {
  it("responds with the correct data", async function () {
    const response = await instrumentsService.getSingleFutureOptionProduct(
      "CME",
      "ES"
    );
    expect(response).toBeDefined();
  });
});

describe("getFuturesProducts", () => {
  it("responds with the correct data", async function () {
    const response = await instrumentsService.getFuturesProducts();
    expect(response.length).toBeGreaterThan(0);
  });
});

describe("getSingleFutureProduct", () => {
  it("responds with the correct data", async function () {
    const response = await instrumentsService.getSingleFutureProduct(
      "CME",
      "ES"
    );
    expect(response.exchange).toBe("CME");
    expect(response.code).toBe("ES");
  });
});

describe("getQuantityDecimalPrecisions", () => {
  it("responds with the correct data", async function () {
    const response = await instrumentsService.getQuantityDecimalPrecisions();
    expect(response.length).toBeGreaterThan(0);
    const btcPrecision = response.filter((item) => item.symbol === "BTC/USD");
    expect(isNil(btcPrecision)).toBeFalsy();
  });
});

describe("getNestedOptionChain", () => {
  it("responds with the correct data", async function () {
    const response = await instrumentsService.getNestedOptionChain("AAPL");
    expect(response.length).toBeGreaterThan(0);

    // Fetch a single option
    const optionChain = response[0] as any;
    const optionExpiration = optionChain.expirations[0] as any;
    const optionStrike = optionExpiration.strikes[0] as any;
    const equityOption = await instrumentsService.getSingleEquityOption(
      optionStrike.call
    );
    expect(equityOption.symbol).toBe(optionStrike.call);
  });
});
