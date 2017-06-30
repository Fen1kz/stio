import {coreError, historyPush} from './index';

const authLoginRequest = (login) => ({
  type: 'authLoginRequest'
  , data: {login}
  , meta: {api: 'login', method: 'POST'}
});

export const authLoginSuccess = (user) => ({
  type: 'authLoginSuccess'
  , data: {user}
});

export const client$authLoginRequest = (login) => (dispatch) => {
  dispatch(authLoginRequest(login))
    .then((data) => {
      dispatch(authLoginSuccess(data));
      dispatch(historyPush('/game'))
    })
    .catch((e) => {
      console.log(e);
      dispatch(coreError(e))
    })
};