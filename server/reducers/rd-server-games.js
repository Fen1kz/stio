import {Map} from 'immutable';
import {createReducer} from '../../shared/utils/redux';
import GameAction from '../../shared/models/game/GameAction';
import {createSelector} from 'reselect';

export const getGame = (state, id) => state.getIn(['games', id]);

const gameActions = {
  [GameAction.Type.UNIT_CREATE]: (state, id, unit) => state.setIn(['units', unit.id], unit)
};

export default createReducer(Map(), {
  gameCreate: (state, {game}) => state.set(game.id, game)
  , gameCommand: (state, {gameId, command}) => state.update(gameId, game => gameActions[command](...command))
});