import TastytradeHttpClient from "./tastytrade-http-client.js";

export default class SessionService {
  constructor(public httpClient: TastytradeHttpClient) {}

  // Sessions: Allows an API client to interact with their session, or create a new one.
  async login(usernameOrEmail: string, password: string, rememberMe = false) {
    // Create a new user session.
    const params = { login: usernameOrEmail, password, rememberMe };
    const sessionResponse = await this.httpClient.postData(
      "/sessions",
      params,
      {}
    );
    // console.debug(
    //   `sessionData extracted:${JSON.stringify(sessionData, null, 2)}, ${
    //     sessionData.data["session-token"]
    //   }`
    // );
    this.httpClient.session.authToken =
      sessionResponse["data"]["session-token"];
    return sessionResponse["data"];
  }

  async loginWithRememberToken(
    usernameOrEmail: string,
    rememberToken: string,
    rememberMe = false
  ) {
    // Creates a session using the remember token.
    const params = { login: usernameOrEmail, rememberToken, rememberMe };
    const sessionData = await this.httpClient.postData("/sessions", params, {});
    this.httpClient.session.authToken = sessionData["data"]["session-token"];
    return sessionData;
  }

  async validate() {
    const response = await this.httpClient.postData(
      "/sessions/validate",
      {},
      {}
    );
    return response;
  }
  async logout() {
    const response = await this.httpClient.deleteData("/sessions", {}); // added this for the integration tests?
    this.httpClient.session.clear();
    return response;
  }
}
