// src/context/state.ts
import { createContext } from 'react';
import TastytradeClient, { QuoteStreamer } from "tastytrade-api"
import { makeAutoObservable } from 'mobx';
import _ from 'lodash'

class TastytradeContext {
    // TODO make configurable
    static Instance = new TastytradeContext('https://api.cert.tastyworks.com', 'wss://streamer.cert.tastyworks.com');
    public tastytradeApi: TastytradeClient
    public accountNumbers: string[] = []
    public quoteStreamer: QuoteStreamer | null = null
    
    constructor(baseUrl: string, accountStreamerUrl: string) {
      makeAutoObservable(this)
      this.tastytradeApi = new TastytradeClient(baseUrl, accountStreamerUrl)
      makeAutoObservable(this.tastytradeApi.session)
    }

    setupQuoteStreamer(token: string, url: string) {
      if (_.isNil(this.quoteStreamer)) {
        this.quoteStreamer = new QuoteStreamer(token, url)
      }

      return this.quoteStreamer
    }

    get isLoggedIn() {
      return this.tastytradeApi.session.isValid
    }
}

const AppContext = createContext(TastytradeContext.Instance)

export { AppContext, TastytradeContext };
