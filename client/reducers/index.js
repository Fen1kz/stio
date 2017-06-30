import {Map} from 'immutable';
import {combineReducers} from 'redux-immutable'

import app from './rd-client-app';
import socket from './rd-client-socket';
import game from './rd-client-game';
import user from './rd-client-user';

export default combineReducers({
  app
  , user
  , socket
  , game
  // , routing: routerReducer
});