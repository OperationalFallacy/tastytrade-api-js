"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportedEventTypes = void 0;
var api_1 = __importStar(require("@dxfeed/api"));
var lodash_1 = __importDefault(require("lodash"));
exports.SupportedEventTypes = [
    api_1.EventType.Quote,
    api_1.EventType.Trade,
    api_1.EventType.Summary,
    api_1.EventType.Greeks,
    api_1.EventType.Profile
];
var QuoteStreamer = /** @class */ (function () {
    function QuoteStreamer(token, url) {
        this.token = token;
        this.url = url;
        this.feed = null;
    }
    QuoteStreamer.prototype.connect = function () {
        this.feed = new api_1.default();
        this.feed.setAuthToken(this.token);
        this.feed.connect(this.url);
    };
    QuoteStreamer.prototype.disconnect = function () {
        if (!lodash_1.default.isNil(this.feed)) {
            this.feed.disconnect();
        }
    };
    QuoteStreamer.prototype.subscribe = function (dxfeedSymbol, eventHandler) {
        if (lodash_1.default.isNil(this.feed)) {
            return lodash_1.default.noop;
        }
        return this.feed.subscribe(exports.SupportedEventTypes, [dxfeedSymbol], eventHandler);
    };
    return QuoteStreamer;
}());
exports.default = QuoteStreamer;
