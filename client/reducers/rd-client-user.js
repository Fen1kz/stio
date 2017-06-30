import {Map} from 'immutable';
import {createReducer} from '../../shared/utils/redux';

export const getUserToken = (state) => state.getIn(['user', 'token']);

const storage = window.sessionStorage;

const saveState = (state) => {
  storage.setItem('user', JSON.stringify(state));
  return state;
};

const loadState = () => Map(JSON.parse(storage.getItem('user') || '{}'));

export default createReducer(loadState(), {
  authLoginSuccess: (state, {user}) => saveState(Map(user))
});