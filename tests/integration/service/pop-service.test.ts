import PopService, { Pop50Request } from "../../../lib/services/pop-service"
import TastytradeHttpClient from "../../../lib/services/tastytrade-http-client";
import SessionService from "../../../lib/services/session-service";
import * as dotenv from 'dotenv'
dotenv.config()

const client = new TastytradeHttpClient(process.env.BASE_URL_PROD!)
const popService = new PopService(client)

const req: Pop50Request = {
  "current-stock-price": 32.9778,
  "current-time-at": new Date(),
  "histogram-ideal-range-count": 60,
  "initial-cost": 62,
  "initial-cost-effect": "Credit",
  "interest-rate": 0.05,
  "target-fraction-of-cost": 0.5,
  "volatility": 0.46049999999999996,
  "legs": [
    {
      "action": "sell_to_open",
      "asset-type": "Equity Option",
      "call-or-put": "P",
      "days-to-expiration": 38,
      "quantity": 1,
      "strike-price": 31,
      "contract-implied-volatility": 0.40590000000000004,
      "expiration-implied-volatility": 0.44049999999999995
    }
  ],
  "source": "WB2;0.22.0"
}

beforeAll(async () => {
  const sessionService = new SessionService(client)
  await sessionService.login(process.env.API_USERNAME!, process.env.API_PASSWORD_PROD!)
});


describe('get50Pop', () => {

  it('response has expected property with a known value', async function() {
    const response = await popService.get50Pop(req)
    expect(response["num-of-paths"]).toEqual(1000)
  })
})
