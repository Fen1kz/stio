import {Map} from 'immutable';
import {createReducer} from '../../shared/utils/redux';
import {createSelector} from 'reselect';

export const getUser = (state, id) => state.getIn(['users', id]);

export default createReducer(Map(), {
  userLogin: (state, {user}) => state.set(user.id, user)
  , userLogout: (state, {userId}) => state.remove(userId)
});