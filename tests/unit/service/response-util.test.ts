import extractResponseData from "../../../lib/utils/response-util";

const responseWithFlatItems = {
  data: {
    items: [
      {
        symbol: "TSLA",
        price: 700,
      },
    ],
  },
};

const responseWithItems = {
  data: {
    data: {
      items: [
        {
          symbol: "AAPL",
          price: 150,
        },
      ],
    },
  },
};

const responseWithData = {
  data: {
    data: {
      username: "masked_user",
      email: "user@example.com",
    },
  },
};

const responseWithOnlyData = {
  data: {
    items: {
      irrelevant: true,
    },
  },
};

const responseWithNoData = {
  status: 500,
  message: "Internal server error",
};

const responseWithErrorStructure = {
  data: {
    error: {
      code: "token_invalid",
      message: "Token is expired",
    },
    status: 401,
  },
};

describe("extractResponseData", () => {
  it("returns data.items when data.items is an array", () => {
    const result = extractResponseData(responseWithFlatItems);
    expect(result).toEqual(responseWithFlatItems.data.items);
  });

  it("returns data.data.items when available", () => {
    const result = extractResponseData(responseWithItems);
    expect(result).toEqual(responseWithItems.data.data.items);
  });

  it("returns data.data when items not present", () => {
    const result = extractResponseData(responseWithData);
    expect(result).toEqual(responseWithData.data.data);
  });

  it("returns full response when no data.data or items present", () => {
    const result = extractResponseData(responseWithOnlyData);
    expect(result).toEqual(responseWithOnlyData.data);
  });

  it("returns full response when top-level structure is not nested", () => {
    const result = extractResponseData(responseWithNoData);
    expect(result).toEqual(responseWithNoData);
  });

  it("returns full response when nested structure is not recognized", () => {
    const result = extractResponseData(responseWithErrorStructure);
    expect(result).toEqual(responseWithErrorStructure.data);
  });
});
