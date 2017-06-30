import GameModel from '../../../shared/models/game/GameModel';
import GameState from '../../../shared/models/game/GameState';

export default class ServerGameModel extends GameModel {
  static create = () => new ServerGameModel();

  update(dt) {
    console.log('update', dt);
  }
}