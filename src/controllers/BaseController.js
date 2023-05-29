"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BControllers = void 0;
var Logger_1 = require("../server/Logger");
var logger = Logger_1.LoggerNS.Logger.getInstance();
var BControllers;
(function (BControllers) {
    var BaseController = /** @class */ (function () {
        function BaseController() {
            this.logger = logger;
        }
        BaseController.prototype.getPage = function () {
            return {};
        };
        BaseController.prototype.notFound = function (page) {
            logger.info("404: " + page);
            return "404";
        };
        return BaseController;
    }());
    BControllers.BaseController = BaseController;
})(BControllers = exports.BControllers || (exports.BControllers = {}));
