import extractResponseData from "../../../lib/utils/response-util";

describe("extractResponseData", () => {
  it("returns data.data.items when present", () => {
    const response = {
      data: {
        data: {
          items: [{ id: 1 }, { id: 2 }],
        },
      },
    };
    const result = extractResponseData(response);
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("returns data.data when items not present", () => {
    const response = {
      data: {
        data: {
          foo: "bar",
        },
      },
    };
    const result = extractResponseData(response);
    expect(result).toEqual({ foo: "bar" });
  });

  it("returns raw response if no nested data", () => {
    const response = {
      context: "/some-context",
      "session-token": "ABC123",
    };
    const result = extractResponseData(response);
    expect(result).toEqual(response);
  });

  it("does not preserve top-level session-token field", () => {
    const response = {
      "session-token": "TOKEN123",
      data: {
        data: {
          user: {
            email: "user@example.com",
            username: "testuser",
          },
        },
      },
    };
    const result = extractResponseData(response);
    expect(result).not.toHaveProperty("session-token");
  });
});
