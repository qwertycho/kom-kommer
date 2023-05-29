const express = require("express");
const router = express.Router();

import { LoggerNS } from "../server/Logger";
const logger = LoggerNS.Logger.getInstance();

import { Controllers } from "../controllers/HomeController";
const controller = new Controllers.HomeController();

export class MainRouter {
  constructor() {
    logger.info("MainRouter constructor");
  }

  public static getRouter(): any {
    return router;
  }
}



router.get("/", (req: any, res: any) => {
  res.render("homepage", {
    title: "Hello World!",
  });
});

router.get("/about", (req: any, res: any) => {
  res.render("homepage", controller.getPage());
});

// 404
router.get("*", (req: any, res: any) => {
  res.send(controller.notFound(req.url));
});