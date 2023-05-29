// @ts-nocheck
import * as _cluster from "cluster";
const cluster = _cluster as unknown as _cluster.Cluster;

import { cpus } from "node:os";
// geeft een error, maar werkt wel
import { availableParallelism } from "node:os";
import process from "node:process";

const dotenv = require("dotenv").config().parsed;

const numCPUs = availableParallelism();

let maxWorkers = numCPUs;
if (dotenv.PROCESSES < numCPUs) {
  maxWorkers = dotenv.PROCESSES;
}

import { LoggerNS } from "./Logger";
const logger = LoggerNS.Logger.getInstance();

export namespace ParelNS {
  export class Parel {
    private workerCount = 0;

    constructor() {}

/**
 * @description start de server met de opgegeven poort en app (express) en maakt workers aan
 * @param port 
 * @param app 
 */
    public start(port: number, app: any) {
      if (cluster.isPrimary) {
        logger.debug(`availableParallelism: ${availableParallelism}`);
        logger.debug(`maxWorkers: ${maxWorkers}`);

        logger.info(`Primary worker is running`);

        // Fork workers.
        for (let i = 0; i < maxWorkers; i++) {
          this.workerCount++;
          cluster.fork();
          logger.info(`Worker count: ${this.workerCount}`);
        }

        cluster.on("exit", (worker: any, code: any, signal: any) => {
          logger.info(`worker ${worker.process.pid} died`);
          cluster.fork();
        });
      } else {

        app.listen(port, () => {
          logger.info(`Server running on port ${port}`);
        });

        logger.info(`new worker started`);
      }
    }
  }
}
