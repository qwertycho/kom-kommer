"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var dotenv = require('dotenv').config().parsed;
var port = dotenv.PORT;
var Logger_1 = require("./server/Logger");
var logger = Logger_1.LoggerNS.Logger.getInstance();
var MainRouter_1 = require("./routes/MainRouter");
app.use('/', MainRouter_1.MainRouter.getRouter());
var Parel_1 = require("./server/Parel");
var parel = new Parel_1.ParelNS.Parel();
parel.start(port, app);
