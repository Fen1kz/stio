'use strict';
import express from 'express';
import EventEmitter from 'events';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {ApiRouter} from './api/ApiRouter';

import Game from '../shared/game/Game';

export default class Application {
  constructor(eventBus) {
    this.app = express();

    this.app.use(cookieParser());
    this.app.use(bodyParser.text());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));

    this.app.use('/api', (new ApiRouter()).router);

    if (module.hot) {
      module.hot.accept('./loadSockets', this.loadSockets, (err) => console.log('HMR Error', err));
    }
    // this.eventBus.on('connection', () => {
    //   if (!this.game) {
    //     this.game = new Game();
    //     this.game.start();
    //   }
    //   this.game.join();
    // }, this)
  }

  loadSockets() {
    
  }
}