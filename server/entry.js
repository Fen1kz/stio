'use strict';

import {Server} from 'http';
import {AppServer} from './AppServer';

let httpListener = null;

const port = 4000;
let nextSocketId = 0;
const sockets = {};

if (module.hot) {
  module.hot.addDisposeHandler((data) => {
    console.log('dispose', data, sockets);
    Object.keys(sockets).forEach(socketId => {
      sockets[socketId].destroy();
    });
    httpListener.close();
  });
  module.hot.accept((err) => {
    console.log('HMR Error', err);
  });
}

httpListener = (new AppServer()).app
  .listen(port, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.info(`🌎 Listening on port ${port}.`);
    }
  })
  .on('connection', (socket) => {
    let socketId = nextSocketId++;
    sockets[socketId] = socket;
    socket.once('close', () => {
      delete sockets[socketId];
    })
  });