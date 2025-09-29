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
