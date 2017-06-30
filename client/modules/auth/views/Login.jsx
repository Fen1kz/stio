import React from 'react';

import {connect} from 'react-redux';
import {client$authLoginRequest} from '../../../actions';
// import {Button, Textfield} from 'react-mdl';

// import {loginUserFormRequest, loginUserTokenRequest} from '../../shared/actions/actions';
// import Validator from 'validatorjs';
// import {RulesLoginPassword} from '../../shared/models/UserModel';
//
// import LocationService from '../services/LocationService';
// import VKAPILogin from './auth/VKAPILogin.jsx';

const INITIAL_STATE = {
  login: ''
};

export class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.state.validation = new Validator(this.state.form, RulesLoginPassword);
    this.state = INITIAL_STATE;
    this.onInput = (event) => this.setState({[event.target.name]: event.target.value});
    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.client$authLoginRequest(this.state.login);
    }
  }

  render() {
    return (
      <form role='form' onSubmit={this.onSubmit}>
        <input onInput={this.onInput} name='login' value={this.state.login}/>
        <input type="submit"/>
      </form>
    );
  }
}

export default connect(() => ({}), (dispatch) => ({
  client$authLoginRequest: (login) => client$authLoginRequest(login)(dispatch)
}))(Login);