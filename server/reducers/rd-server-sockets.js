import {Map} from 'immutable';
import {createReducer} from '../../shared/utils/redux';
import {createSelector} from 'reselect';

export const getSocket = (state, id) => state.getIn(['sockets', id]);


export default createReducer(Map(), {
  socketConnect: (state, {socket}) => state
    .set(socket.id, socket)
  , socketDisconnect: (state, {socketId}) => state
    .remove(socketId)
});