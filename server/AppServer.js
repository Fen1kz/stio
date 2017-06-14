import http from 'http';
import io from 'socket.io';
import createFrontendMiddleware from './frontend/create-frontend-middleware';

export default class AppServer {
  constructor() {
    this.loadApplication = this.loadApplication.bind(this, () => new (require('./Application').default)(this.events));
    this.loadSockets = this.loadSockets.bind(this, () => new (require('./loadSockets').default)(this.events));
    this.nextSocketId = 0;
    this.sockets = {};

    this.httpServer = http.createServer();
    this.frontendMiddleware = createFrontendMiddleware();

    this.loadApplication();
    this.loadSockets();

    if (module.hot) {
      module.hot.accept('./Application', this.loadApplication, (err) => console.log('HMR Error', err));
      module.hot.accept('./loadSockets', this.loadSockets, (err) => console.log('HMR Error', err));
    }
  }

  loadApplication(requireNew) {
    if (this.currentApplication) {
      this.currentApplication.dispose(this.events);
      this.httpServer.removeListener('request', this.currentApplication.app);
    }
    this.currentApplication = requireNew();
    this.frontendMiddleware(this.currentApplication.app);
    this.httpServer.on('request', this.currentApplication.app);
    this.ioServer = io(this.httpServer, {path: '/api/socket-io'});
  }

  loadSockets(requireNew) {
    if (this.currentSocketIOListener) {
      this.ioServer.removeListener('connection', this.currentSocketIOListener);
    }
    this.currentSocketIOListener = requireNew(this);
    this.ioServer.on('connection', this.currentSocketIOListener);
  };

  start() {
    this.httpServer
      .listen(process.env.PORT, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.info(`Listening on port ${process.env.PORT}.`);
        }
      })
      .on('connection', (socket) => {
        let socketId = this.nextSocketId++;
        this.sockets[socketId] = socket;
        socket.once('close', () => {
          delete this.sockets[socketId];
        })
      });
    return this;
  }

  stop() {
    Object.keys(this.sockets).forEach(socketId => {
      this.sockets[socketId].destroy();
    });
    this.httpServer.close();
    return this;
  }
}

// const port = 4000;
// let nextSocketId = 0;
// const sockets = {};
//
// console.log('MAIN entry.js');
// const httpListener = (new AppServer()).app
//   .listen(port, (error) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.info(`🌎 Listening on port ${port}.`);
//     }
//   });
//   .on('connection', (socket) => {
//     let socketId = nextSocketId++;
//     sockets[socketId] = socket;
//     socket.once('close', () => {
//       delete sockets[socketId];
//     })
//   });
//
// if (module.hot) {
//   module.hot.addDisposeHandler((data) => {
//     Object.keys(sockets).forEach(socketId => {
//       sockets[socketId].destroy();
//     });
//     httpListener.close();
//     // appServer.acceptHMR();
//     // data.httpListener = httpListener;
//     // data.appServer = appServer;
//   });
//   module.hot.accept((err) => {
//     console.log('HMR Error', err);
//   });
// }