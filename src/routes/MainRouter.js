"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
var express = require("express");
var router = express.Router();
var Logger_1 = require("../server/Logger");
var logger = Logger_1.LoggerNS.Logger.getInstance();
var HomeController_1 = require("../controllers/HomeController");
var controller = new HomeController_1.Controllers.HomeController();
var MainRouter = /** @class */ (function () {
    function MainRouter() {
        logger.info("MainRouter constructor");
    }
    MainRouter.getRouter = function () {
        return router;
    };
    return MainRouter;
}());
exports.MainRouter = MainRouter;
router.get("/", function (req, res) {
    res.render("homepage", {
        title: "Hello World!",
    });
});
router.get("/about", function (req, res) {
    res.render("homepage", controller.getPage());
});
// 404
router.get("*", function (req, res) {
    res.send(controller.notFound(req.url));
});
