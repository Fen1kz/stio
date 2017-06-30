export const coreError = (e) => ({
  type: 'coreError'
  , data: e
});

export const historyPush = (path) => ({
  type: '@@historyMiddleware/push'
  , data: path
});

export * from './act-client-sockets';
export * from './act-client-auth';
export * from './act-client-game';
export * from './act-client-game-controls';