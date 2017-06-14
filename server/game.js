export default class Game {
  constructor() {
    this.tickLengthMs = 1000 / 5;
    this.previousTick = Date.now();
    this.actualTicks = 0;

    this.gameTick = this.gameTick.bind(this);

    this.gameTick();
  }

  gameTick() {
    const now = Date.now();
    this.actualTicks++;

    if (this.previousTick + this.tickLengthMs <= now) {
      const delta = (now - this.previousTick);
      this.previousTick = now;

      this.gameUpdate(delta);

      console.log('delta', (delta / 1000).toFixed(3), '(target: ' + this.tickLengthMs + ' ms)', 'node ticks', this.actualTicks);
      this.actualTicks = 0
    }
    if (Date.now() - this.previousTick < this.tickLengthMs - 16) {
      setTimeout(this.gameLoop)
    } else {
      setImmediate(this.gameLoop)
    }
  }

  gameUpdate(delta) {

  }
}