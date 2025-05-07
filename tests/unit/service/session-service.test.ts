import SessionService from "../../../lib/services/session-service";
import TastytradeHttpClient from "../../../lib/services/tastytrade-http-client";

import { setGlobalDispatcher, MockAgent } from "undici";

const mockAgent = new MockAgent();
mockAgent.disableNetConnect();
const mockPool = mockAgent.get("https://fakeurl.org");
setGlobalDispatcher(mockAgent);

beforeEach(() => {
  // POST /sessions/validate
  mockAgent
    .get("https://fakeurl.org")
    .intercept({ path: "/sessions/validate", method: "POST" })
    .reply(200, {
      data: {
        email: "fakeuser",
        username: "fakeuser",
        "external-id": "U12345",
        "is-confirmed": true,
      },
    });
  // DELETE /sessions
  mockAgent
    .get("https://fakeurl.org")
    .intercept({ path: "/sessions", method: "DELETE" })
    .reply(204, {});
});

const BaseUrl = "https://fakeurl.org";
const expectedToken =
  "uyGnM9HETekp4rgUMdAAhRgodUQ02oAW3gGN2h61e4gqxkSk0_ajqQ+C";

describe("login", () => {
  const responseData = {
    "session-token": expectedToken,
    user: {
      email: "fake-user@tastytrade.com",
      "external-id": "U8aacecd2-545f-4077-9d55-7ccd04cbbfea",
    },
  };
  it("sets the correct auth token", async function () {
    mockPool
      .intercept({ path: "/sessions", method: "POST" })
      .reply(200, responseData);
    const client = new TastytradeHttpClient(BaseUrl);
    const sessionService = new SessionService(client);
    await sessionService.login("fakeusername", "fakepassword");
    expect(client.session.authToken).toBe(expectedToken);
    expect(client.session.isValid).toBeTruthy();
  });
});

describe("loginWithRememberToken", () => {
  const responseData = {
    "session-token": expectedToken,
    user: {
      email: "fake-user@tastytrade.com",
      "external-id": "U8aacecd2-545f-4077-9d55-7ccd04cbbfea",
    },
    "remember-token": "AK-rKgllt-H-IBQ-kUa2cA8rt1j4a-nmc46AyVa6HrjPyF4oARrHPA",
  };
  it("sets the correct auth token", async function () {
    mockPool
      .intercept({ path: "/sessions", method: "POST" })
      .reply(200, responseData);
    const client = new TastytradeHttpClient(BaseUrl);
    const sessionService = new SessionService(client);
    await sessionService.loginWithRememberToken(
      "fakeUsername",
      "fakeRememberToken"
    );
    expect(client.session.authToken).toBe(expectedToken);
    expect(client.session.isValid).toBeTruthy();
  });
});

describe("validate", () => {
  it("sets the correct auth token", async function () {
    mockPool
      .intercept({ path: "/sessions/validate", method: "POST" })
      .reply(200, {
        data: {
          email: "fakeuser",
          username: "fakeuser",
          "external-id": "U12345",
          "is-confirmed": true,
        },
      });
    const client = new TastytradeHttpClient(BaseUrl);
    client.session.authToken = expectedToken;
    const sessionService = new SessionService(client);
    await sessionService.validate();
    const result = await sessionService.validate();
    expect(client.session.authToken).toBe(expectedToken);
    expect(client.session.isValid).toBeTruthy();
    expect(result.data.username).toBe("fakeuser");
  });
});

describe("logout", () => {
  it("sets the correct auth token", async function () {
    mockPool.intercept({ path: "/sessions", method: "DELETE" }).reply(204, {});
    const client = new TastytradeHttpClient(BaseUrl);
    client.session.authToken = "faketoken";
    const sessionService = new SessionService(client);
    await sessionService.logout();
    expect(client.session.authToken).toBeNull();
    expect(client.session.isValid).toBe(false);
  });
});

describe("TastytradeHttpClient", () => {
  it("executes GET request", async () => {
    mockPool
      .intercept({ path: "/accounts", method: "GET" })
      .reply(200, { data: { ok: true } });
    const client = new TastytradeHttpClient(BaseUrl);
    const result = await client.getData("/accounts");
    expect(result.data.ok).toBe(true);
  });

  it("executes POST request", async () => {
    mockPool
      .intercept({ path: "/accounts", method: "POST" })
      .reply(200, { created: true });
    const client = new TastytradeHttpClient(BaseUrl);
    const result = await client.postData("/accounts", { foo: "bar" }, {});
    expect(result.created).toBe(true);
  });

  it("executes PUT request", async () => {
    mockPool
      .intercept({ path: "/accounts/settings", method: "PUT" })
      .reply(200, { updated: true });
    const client = new TastytradeHttpClient(BaseUrl);
    const result = await client.putData(
      "/accounts/settings",
      { foo: "bar" },
      {}
    );
    expect(result.updated).toBe(true);
  });

  it("executes PATCH request", async () => {
    mockPool
      .intercept({ path: "/accounts/settings", method: "PATCH" })
      .reply(200, { patched: true });
    const client = new TastytradeHttpClient(BaseUrl);
    const result = await client.patchData(
      "/accounts/settings",
      { bar: "baz" },
      {}
    );
    expect(result.patched).toBe(true);
  });

  it("executes DELETE request", async () => {
    mockPool
      .intercept({ path: "/accounts/123", method: "DELETE" })
      .reply(204, {});
    const client = new TastytradeHttpClient(BaseUrl);
    const result = await client.deleteData("/accounts/123", {});
    expect(result).toEqual({});
  });

  it("includes Authorization header when session.authToken is set", async () => {
    const token = "Bearer YEEEET-TOKEN";
    const client = new TastytradeHttpClient(BaseUrl);
    client.session.authToken = token;

    let seenAuthHeader: unknown = null;
    mockPool
      .intercept({ path: "/check-auth", method: "GET" })
      .reply(200, (opts) => {
        const headers =
          opts.headers instanceof Headers
            ? Object.fromEntries(opts.headers.entries())
            : (opts.headers as Record<string, string> | undefined);

        seenAuthHeader =
          headers?.["Authorization"] ?? headers?.["authorization"] ?? null;
        return { ok: true };
      });

    const result = await client.getData("/check-auth");
    expect(result.ok).toBe(true);
    expect(seenAuthHeader).toBe(token);
  });

  it("filters undefined headers from mergedHeaders", async () => {
    const client = new TastytradeHttpClient(BaseUrl);

    let rawHeaders: unknown = undefined;
    mockPool
      .intercept({ path: "/check-headers", method: "GET" })
      .reply(200, (opts) => {
        rawHeaders = opts.headers;
        return { ok: true };
      });

    await client.getData("/check-headers", { "X-Undefined-Test": undefined });
    // @ts-expect-error: rawHeaders is unknown, but we expect it to be an object for this test
    expect(rawHeaders["x-undefined-test"]).toBeUndefined();
  });
});
