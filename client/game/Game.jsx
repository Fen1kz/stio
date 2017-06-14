import React from 'react';
import io from 'socket.io-client';

import './Game.scss';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    const socket = io(window.location.host, {forceNew: true, path: '/api/socket-io'});
    socket.on('connect', () => {
      this.setState({connected: true});
    });
    socket.on('disconnect', () => {
      this.setState({connected: false});
    });
    this.state = {
      connected: false
    };
    // this.state.dudes =
  }

  componentDidMount() {
  }

  render() {
    const {connected} = this.state;
    return <div>
      <div>{JSON.stringify(connected)}</div>
    </div>
  }
}