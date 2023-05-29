"use strict";
exports.__esModule = true;
exports.LoggerNS = void 0;
require("dotenv").config();
var LoggerNS;
(function (LoggerNS) {
    var Logger = /** @class */ (function () {
        function Logger() {
            this.logLevel = "ERROR";
            this.values = {
                ERROR: 0,
                WARN: 1,
                INFO: 2,
                DEBUG: 3
            };
            this.logLevel = String(process.env.LOG_LEVEL).toUpperCase();
        }
        Logger.setLogLevel = function (logLevel) {
            Logger.getInstance().logLevel = logLevel.toUpperCase();
        };
        Logger.getInstance = function () {
            if (!Logger.instance) {
                Logger.instance = new Logger();
            }
            return Logger.instance;
        };
        Logger.prototype.error = function (message) {
            this.log(message, "ERROR");
        };
        Logger.prototype.warn = function (message) {
            this.log(message, "WARN");
        };
        Logger.prototype.info = function (message) {
            this.log(message, "INFO");
        };
        Logger.prototype.debug = function (message) {
            this.log(message, "DEBUG");
        };
        Logger.prototype.log = function (message, MlogLevel) {
            if (this.values[MlogLevel] <= this.values[Logger.getInstance().logLevel]) {
                console.log("".concat(MlogLevel, ": ").concat(message));
            }
        };
        return Logger;
    }());
    LoggerNS.Logger = Logger;
})(LoggerNS = exports.LoggerNS || (exports.LoggerNS = {}));
