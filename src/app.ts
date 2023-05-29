const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const dotenv = require('dotenv').config().parsed;

const port = dotenv.PORT;

import { LoggerNS } from './server/Logger';
const logger = LoggerNS.Logger.getInstance();

import { MainRouter } from './routes/MainRouter';
app.use('/', MainRouter.getRouter());

import { ParelNS } from './server/Parel';
const parel = new ParelNS.Parel();
parel.start(port, app);