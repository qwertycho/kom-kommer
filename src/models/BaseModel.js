"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
var Logger_1 = require("../server/Logger");
var logger = Logger_1.LoggerNS.Logger.getInstance();
var models;
(function (models) {
    var BaseModel = /** @class */ (function () {
        function BaseModel() {
            this.logger = logger;
        }
        BaseModel.prototype.render = function () {
            return {};
        };
        return BaseModel;
    }());
    models.BaseModel = BaseModel;
})(models = exports.models || (exports.models = {}));
