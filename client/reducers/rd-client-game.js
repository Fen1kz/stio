import {List, Map, Record} from 'immutable';
import {createReducer} from '../../shared/utils/redux';
import {createSelector} from 'reselect';

import ClientGameModel from '../models/game/ClientGameModel';

export default createReducer(new ClientGameModel(), {
  gameClientInput: (state, {inputPack}) => state.updateIn(['inputs'], (inputs = List()) => inputs.push(inputPack))
  , gameClientProcess: (state, {}) => state.update('raw', raw => raw.concat(inputPack))
  , gameClientSend: (state, {}) => state.update('raw', raw => raw.concat(inputPack))
  , gameStateUpdateIter: (state, {}) => state.update('raw', raw => raw.concat(inputPack))
  , gameStateUpdateSync: (state, {gameState}) => gameState
});





