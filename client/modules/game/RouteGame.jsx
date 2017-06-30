import React from 'react';
import {connect} from 'react-redux';

import {client$socketConnect, client$socketDisconnect} from '../../actions';
import {getSocket} from '../../reducers/rd-client-socket'

export class RouteGame extends React.PureComponent {
  constructor(props) {
    super(props);
    const {client$socketConnect, client$socketDisconnect} = this.props;
    this.connect = () => {
      client$socketConnect()
    };
    this.disconnect = () => {
      client$socketDisconnect()
    };
  }

  render() {
    const {socketStatus, game} = this.props;
    return <div id='route-game'>
      <div>{socketStatus}</div>
      <button onClick={this.connect}>connect</button>
      {!!socketStatus ? this.renderConnected() : 'socket disconnected'}
      <div>game: {JSON.stringify(game)}</div>
      {!!game && this.renderGame()}
    </div>
  }

  renderConnected() {
    return (<div>
      <button onClick={this.disconnect}>disconnect</button>
    </div>);
  }

  renderGame() {
    const game = this.props.game;
    return (<div id='game'>
    </div>);
  }
}

export default connect((state) => ({
    socketStatus: !!getSocket(state)
    , game: state.get('game')
  })
  , (dispatch) => ({
    client$socketConnect: () => dispatch(client$socketConnect())
    , client$socketDisconnect: () => dispatch(client$socketDisconnect())
  }))(RouteGame);