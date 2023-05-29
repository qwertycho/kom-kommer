"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
var HomeModel_1 = require("../models/HomeModel");
var BaseController_1 = require("../controllers/BaseController");
var Controllers;
(function (Controllers) {
    var HomeController = /** @class */ (function (_super) {
        __extends(HomeController, _super);
        function HomeController() {
            var _this = _super.call(this) || this;
            _this.logger.info("HomeController constructor");
            _this.model = new HomeModel_1.Mmodels.HomeModel();
            return _this;
        }
        HomeController.prototype.getPage = function () {
            return this.model.render();
        };
        return HomeController;
    }(BaseController_1.BControllers.BaseController));
    Controllers.HomeController = HomeController;
})(Controllers = exports.Controllers || (exports.Controllers = {}));
