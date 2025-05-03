// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function extractResponseData(httpResponse: any) {
  if (httpResponse?.data?.data?.items !== undefined) {
    return httpResponse.data.data.items;
  } else if (httpResponse?.data?.data !== undefined) {
    return httpResponse.data.data;
  } else {
    return httpResponse;
  }
}

// add login parser here
// create unit tests for login parser, extractreponsedata
