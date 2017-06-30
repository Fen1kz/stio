import {Map} from 'immutable';
import {combineReducers} from 'redux-immutable'

import sockets from './rd-server-sockets';

export default combineReducers({
  sockets
  // , routing: routerReducer
});