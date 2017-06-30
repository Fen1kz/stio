import {List} from 'immutable';

import GameModel from '../../../shared/models/game/GameModel';
import GameState from '../../../shared/models/game/GameState';
import GameAction from '../../../shared/models/game/GameAction';
import InputManager from './manage/InputManager';

const getTimestamp = () => window.performance.now();
const prediction = true;

export default class ClientGameModel {
  constructor() {
    this.step = 1e3 / 60;
    this.timeLast = getTimestamp();
    this.requestFrame = (fn) => window.requestAnimationFrame(fn);
  }

  start() {
    this.input = new InputManager();
    this.input.start(() => 0);
    this.requestFrame(this.onFrame);
  }

  onFrame = () => {
    const timeNow = getTimestamp();
    this.timeDelta = timeNow - this.timeLast;
    while (this.timeDelta > this.step) {
      this.timeDelta -= this.step;
      this.update(this.step);
    }
    this.render(this.timeDelta);
    this.timeLast = timeNow;
    this.requestFrame(this.onFrame);
  };

  update(dt) {
    this.input.update(dt);
  }

  render(dt) {
  }

  // onFrame = (dt) => this.withMutations(game => {
  //   if (prediction) {
  //     const clientDelta = this.processInputs();
  //     game.merge('state', clientDelta);
  //   }
  // });

  onState = (delta) => this.withMutations(game => {
    game.update('inputs', inputs => inputs.filter(inputPack => inputPack.timestamp > delta.timestamp));
    game.update('state', state => state.merge(delta));
  });

  processInputs() {
    return this.inputs.reduce((delta, inputAction) => {
      const updateFn = GameAction[inputAction.type];
      return updateFn(delta, inputAction.subjectId, inputAction.value);
    }, new GameState())
  }
}