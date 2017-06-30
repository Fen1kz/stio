import io from 'socket.io-client';

import {client$gameInit} from '../actions';
import {socketConnect, socketDisconnect, utilQuestionToServer} from '../../shared/actions';

import {getSocket} from '../reducers/rd-client-socket'
import {getUserToken} from '../reducers/rd-client-user'

export const client$socketConnect = (socket) => (dispatch, getState) => {
  if (!socket) socket = io({
    path: '/api/socket-io'
    , transports: ['websocket']
  });
  // if (!socket) socket = io('http://localhost:5000', {
  //   transports: ['websocket']
  // });
  socket.on('connect', () => {
    socket.emit('login:request', getUserToken(getState()));
  });
  socket.on('disconnect', () => {
    dispatch(socketDisconnect());
  });
  socket.on('login:success', () => {
    dispatch(socketConnect(socket));
    // dispatch(client$gameInit());
    socket.on('action', (action) => {
      dispatch(action);
    });
  });
};

export const client$socketDisconnect = () => (dispatch, getState) => {
  const socket = getSocket(getState());
  socket.disconnect();
};

export const client$socketEmit = (action) => (dispatch, getState) => {
  const socket = getSocket(getState());
  socket.emit('action', action);
};