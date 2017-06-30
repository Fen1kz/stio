const INPUT_FPS_SEND = 1;
const INPUT_FPS_SEND_TIMEOUT = 1e3 / INPUT_FPS_SEND;

const getTimestamp = () => window.performance.now();

export default class InputManager {
  constructor() {
    this.controls = {
      up: false
      , down: false
      , left: false
      , right: false
      , space: false
    };

    this.lastTimestamp = getTimestamp();

    this.actions = [];
  }

  start(sendFn) {
    this.sendFn = sendFn;
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  stop() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyDown = (e) => {
    if (e.keyCode === 32) this.controls.space = true;
    else if (e.keyCode === 37) this.controls.left = true;
    else if (e.keyCode === 38) this.controls.up = true;
    else if (e.keyCode === 39) this.controls.right = true;
    else if (e.keyCode === 40) this.controls.down = true;
  };

  onKeyUp = (e) => {
    if (e.keyCode === 32) this.controls.space = false;
    else if (e.keyCode === 37) this.controls.left = false;
    else if (e.keyCode === 38) this.controls.up = false;
    else if (e.keyCode === 39) this.controls.right = false;
    else if (e.keyCode === 40) this.controls.down = false;
  };

  update(dt) {
    for (let control in this.controls) {
      if (this.controls.hasOwnProperty(control) && this.controls[control]) {
        this.actions.push(control);
      }
    }
    const timestamp = getTimestamp();
    if (timestamp - this.lastTimestamp > INPUT_FPS_SEND_TIMEOUT) {
      this.sendInput();
      this.lastTimestamp = timestamp;
    }
  }

  sendInput = () => {
    if (this.actions.length > 0) {
      const input = {timestamp: Date.now(), actions: this.actions};
      this.actions = [];
      this.sendFn(input);
    }
  };

  compressInput = (actions) => {
    return actions.reduce((result, action) => {
      // const nextAction =
      switch (action) {
      }
      return result;
    }, [])
  }
}