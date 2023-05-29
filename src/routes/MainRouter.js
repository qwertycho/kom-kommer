"use strict";
exports.__esModule = true;
exports.MainRouter = void 0;
var express = require("express");
var router = express.Router();
var Logger_1 = require("../server/Logger");
var logger = Logger_1.LoggerNS.Logger.getInstance();
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
        title: "Hello World!"
    });
});
router.get("/about", function (req, res) {
    res.render("homepage", {
        title: "About"
    });
});
