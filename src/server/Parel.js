"use strict";
exports.__esModule = true;
exports.ParelNS = void 0;
// @ts-nocheck
var _cluster = require("cluster");
var cluster = _cluster;
// geeft een error, maar werkt wel
var node_os_1 = require("node:os");
var dotenv = require("dotenv").config().parsed;
var numCPUs = (0, node_os_1.availableParallelism)();
var maxWorkers = numCPUs;
if (dotenv.PROCESSES < numCPUs) {
    maxWorkers = dotenv.PROCESSES;
}
var Logger_1 = require("./Logger");
var logger = Logger_1.LoggerNS.Logger.getInstance();
var ParelNS;
(function (ParelNS) {
    var Parel = /** @class */ (function () {
        function Parel() {
            this.workerCount = 0;
        }
        /**
         * @description start de server met de opgegeven poort en app (express) en maakt workers aan
         * @param port
         * @param app
         */
        Parel.prototype.start = function (port, app) {
            if (cluster.isPrimary) {
                logger.debug("availableParallelism: ".concat(node_os_1.availableParallelism));
                logger.debug("maxWorkers: ".concat(maxWorkers));
                logger.info("Primary worker is running");
                // Fork workers.
                for (var i = 0; i < maxWorkers; i++) {
                    this.workerCount++;
                    cluster.fork();
                    logger.info("Worker count: ".concat(this.workerCount));
                }
                cluster.on("exit", function (worker, code, signal) {
                    logger.info("worker ".concat(worker.process.pid, " died"));
                    cluster.fork();
                });
            }
            else {
                app.listen(port, function () {
                    logger.info("Server running on port ".concat(port));
                });
                logger.info("new worker started");
            }
        };
        return Parel;
    }());
    ParelNS.Parel = Parel;
})(ParelNS = exports.ParelNS || (exports.ParelNS = {}));
