import {Map} from 'immutable';
import {createReducer} from '../../shared/utils/redux';
import {createSelector} from 'reselect';

export const getSocket = state => state.get('socket');
export const getSocketStatus = state => state.getIn(['socket', 'status']);


export default createReducer(null, {
  socketConnect: (state, {socket}) => socket
  , socketDisconnect: (state) => null
});