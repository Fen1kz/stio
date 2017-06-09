'use strict';
import 'source-map-support/register';

import * as express from 'express';

import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import {ApiRouter} from './api/ApiRouter';

export class AppServer {
  constructor() {
    console.log('Constructing AppServer', (new ApiRouter()).getRoot.toString());
    this.app = express();
    this.app.use(cookieParser());
    this.app.use(bodyParser.text());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));

    this.app.use('/api', (new ApiRouter()).router);
  }
}