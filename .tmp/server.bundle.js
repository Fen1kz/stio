/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/actions/act-client-auth.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client$authLoginRequest = exports.authLoginSuccess = undefined;

var _index = __webpack_require__("./client/actions/index.js");

var authLoginRequest = function authLoginRequest(login) {
  return {
    type: 'authLoginRequest',
    data: { login: login },
    meta: { api: 'login', method: 'POST' }
  };
};

var authLoginSuccess = exports.authLoginSuccess = function authLoginSuccess(user) {
  return {
    type: 'authLoginSuccess',
    data: { user: user }
  };
};

var client$authLoginRequest = exports.client$authLoginRequest = function client$authLoginRequest(login) {
  return function (dispatch) {
    dispatch(authLoginRequest(login)).then(function (data) {
      dispatch(authLoginSuccess(data));
      dispatch((0, _index.historyPush)('/game'));
    }).catch(function (e) {
      console.log(e);
      dispatch((0, _index.coreError)(e));
    });
  };
};

/***/ }),

/***/ "./client/actions/act-client-game-controls.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var gameClientInput = exports.gameClientInput = function gameClientInput(inputPack) {
  return {
    type: 'gameClientInput',
    data: { inputPack: inputPack },
    meta: { socket: true }
  };
};

var client$gameClientInput = exports.client$gameClientInput = function client$gameClientInput(inputPack) {
  return function (dispatch, getState) {
    if (inputPack.actions.length > 0) {
      console.log('client$gameClientInput', inputPack);
      dispatch(gameClientInput(inputPack));
    }
  };
};

/***/ }),

/***/ "./client/actions/act-client-game.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client$gameInit = undefined;

var _ClientGameModel = __webpack_require__("./client/models/game/ClientGameModel.js");

var _ClientGameModel2 = _interopRequireDefault(_ClientGameModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client$gameInit = exports.client$gameInit = function client$gameInit() {
  return function (dispatch, getState) {
    // const game = getState().game;
    // console.log('game', game);
    // game.start();
    // let prevTime = Date.now();
    // window.requestAnimationFrame(game.onFrame)
    // const game = new ClientGameModel();
    // game.start()
  };
};

/***/ }),

/***/ "./client/actions/act-client-sockets.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client$socketEmit = exports.client$socketDisconnect = exports.client$socketConnect = undefined;

var _socket = __webpack_require__(6);

var _socket2 = _interopRequireDefault(_socket);

var _actions = __webpack_require__("./client/actions/index.js");

var _actions2 = __webpack_require__("./shared/actions/index.js");

var _rdClientSocket = __webpack_require__("./client/reducers/rd-client-socket.js");

var _rdClientUser = __webpack_require__("./client/reducers/rd-client-user.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client$socketConnect = exports.client$socketConnect = function client$socketConnect(socket) {
  return function (dispatch, getState) {
    if (!socket) socket = (0, _socket2.default)({
      path: '/api/socket-io',
      transports: ['websocket']
    });
    // if (!socket) socket = io('http://localhost:5000', {
    //   transports: ['websocket']
    // });
    socket.on('connect', function () {
      socket.emit('login:request', (0, _rdClientUser.getUserToken)(getState()));
    });
    socket.on('disconnect', function () {
      dispatch((0, _actions2.socketDisconnect)());
    });
    socket.on('login:success', function () {
      dispatch((0, _actions2.socketConnect)(socket));
      // dispatch(client$gameInit());
      socket.on('action', function (action) {
        dispatch(action);
      });
    });
  };
};

var client$socketDisconnect = exports.client$socketDisconnect = function client$socketDisconnect() {
  return function (dispatch, getState) {
    var socket = (0, _rdClientSocket.getSocket)(getState());
    socket.disconnect();
  };
};

var client$socketEmit = exports.client$socketEmit = function client$socketEmit(action) {
  return function (dispatch, getState) {
    var socket = (0, _rdClientSocket.getSocket)(getState());
    socket.emit('action', action);
  };
};

/***/ }),

/***/ "./client/actions/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actClientSockets = __webpack_require__("./client/actions/act-client-sockets.js");

Object.keys(_actClientSockets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actClientSockets[key];
    }
  });
});

var _actClientAuth = __webpack_require__("./client/actions/act-client-auth.js");

Object.keys(_actClientAuth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actClientAuth[key];
    }
  });
});

var _actClientGame = __webpack_require__("./client/actions/act-client-game.js");

Object.keys(_actClientGame).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actClientGame[key];
    }
  });
});

var _actClientGameControls = __webpack_require__("./client/actions/act-client-game-controls.js");

Object.keys(_actClientGameControls).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actClientGameControls[key];
    }
  });
});
var coreError = exports.coreError = function coreError(e) {
  return {
    type: 'coreError',
    data: e
  };
};

var historyPush = exports.historyPush = function historyPush(path) {
  return {
    type: '@@historyMiddleware/push',
    data: path
  };
};

/***/ }),

/***/ "./client/models/game/ClientGameModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = __webpack_require__(0);

var _GameModel = __webpack_require__("./shared/models/game/GameModel.js");

var _GameModel2 = _interopRequireDefault(_GameModel);

var _GameState = __webpack_require__("./shared/models/game/GameState.js");

var _GameState2 = _interopRequireDefault(_GameState);

var _GameAction = __webpack_require__("./shared/models/game/GameAction.js");

var _GameAction2 = _interopRequireDefault(_GameAction);

var _InputManager = __webpack_require__("./client/models/game/manage/InputManager.js");

var _InputManager2 = _interopRequireDefault(_InputManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getTimestamp = function getTimestamp() {
  return window.performance.now();
};
var prediction = true;

var ClientGameModel = function () {
  function ClientGameModel() {
    var _this = this;

    _classCallCheck(this, ClientGameModel);

    this.onFrame = function () {
      var timeNow = getTimestamp();
      _this.timeDelta = timeNow - _this.timeLast;
      while (_this.timeDelta > _this.step) {
        _this.timeDelta -= _this.step;
        _this.update(_this.step);
      }
      _this.render(_this.timeDelta);
      _this.timeLast = timeNow;
      _this.requestFrame(_this.onFrame);
    };

    this.onState = function (delta) {
      return _this.withMutations(function (game) {
        game.update('inputs', function (inputs) {
          return inputs.filter(function (inputPack) {
            return inputPack.timestamp > delta.timestamp;
          });
        });
        game.update('state', function (state) {
          return state.merge(delta);
        });
      });
    };

    this.step = 1e3 / 60;
    this.timeLast = getTimestamp();
    this.requestFrame = function (fn) {
      return window.requestAnimationFrame(fn);
    };
  }

  _createClass(ClientGameModel, [{
    key: 'start',
    value: function start() {
      this.input = new _InputManager2.default();
      this.input.start(function () {
        return 0;
      });
      this.requestFrame(this.onFrame);
    }
  }, {
    key: 'update',
    value: function update(dt) {
      this.input.update(dt);
    }
  }, {
    key: 'render',
    value: function render(dt) {}

    // onFrame = (dt) => this.withMutations(game => {
    //   if (prediction) {
    //     const clientDelta = this.processInputs();
    //     game.merge('state', clientDelta);
    //   }
    // });

  }, {
    key: 'processInputs',
    value: function processInputs() {
      return this.inputs.reduce(function (delta, inputAction) {
        var updateFn = _GameAction2.default[inputAction.type];
        return updateFn(delta, inputAction.subjectId, inputAction.value);
      }, new _GameState2.default());
    }
  }]);

  return ClientGameModel;
}();

exports.default = ClientGameModel;

/***/ }),

/***/ "./client/models/game/manage/InputManager.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INPUT_FPS_SEND = 1;
var INPUT_FPS_SEND_TIMEOUT = 1e3 / INPUT_FPS_SEND;

var getTimestamp = function getTimestamp() {
  return window.performance.now();
};

var InputManager = function () {
  function InputManager() {
    var _this = this;

    _classCallCheck(this, InputManager);

    this.onKeyDown = function (e) {
      if (e.keyCode === 32) _this.controls.space = true;else if (e.keyCode === 37) _this.controls.left = true;else if (e.keyCode === 38) _this.controls.up = true;else if (e.keyCode === 39) _this.controls.right = true;else if (e.keyCode === 40) _this.controls.down = true;
    };

    this.onKeyUp = function (e) {
      if (e.keyCode === 32) _this.controls.space = false;else if (e.keyCode === 37) _this.controls.left = false;else if (e.keyCode === 38) _this.controls.up = false;else if (e.keyCode === 39) _this.controls.right = false;else if (e.keyCode === 40) _this.controls.down = false;
    };

    this.sendInput = function () {
      if (_this.actions.length > 0) {
        var input = { timestamp: Date.now(), actions: _this.actions };
        _this.actions = [];
        _this.sendFn(input);
      }
    };

    this.compressInput = function (actions) {
      return actions.reduce(function (result, action) {
        // const nextAction =
        switch (action) {}
        return result;
      }, []);
    };

    this.controls = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false
    };

    this.lastTimestamp = getTimestamp();

    this.actions = [];
  }

  _createClass(InputManager, [{
    key: 'start',
    value: function start(sendFn) {
      this.sendFn = sendFn;
      document.addEventListener('keydown', this.onKeyDown);
      document.addEventListener('keyup', this.onKeyUp);
    }
  }, {
    key: 'stop',
    value: function stop() {
      document.removeEventListener('keydown', this.onKeyDown);
      document.removeEventListener('keyup', this.onKeyUp);
    }
  }, {
    key: 'update',
    value: function update(dt) {
      for (var control in this.controls) {
        if (this.controls.hasOwnProperty(control) && this.controls[control]) {
          this.actions.push(control);
        }
      }
      var timestamp = getTimestamp();
      if (timestamp - this.lastTimestamp > INPUT_FPS_SEND_TIMEOUT) {
        this.sendInput();
        this.lastTimestamp = timestamp;
      }
    }
  }]);

  return InputManager;
}();

exports.default = InputManager;

/***/ }),

/***/ "./client/reducers/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = __webpack_require__(0);

var _reduxImmutable = __webpack_require__(4);

var _rdClientApp = __webpack_require__("./client/reducers/rd-client-app.js");

var _rdClientApp2 = _interopRequireDefault(_rdClientApp);

var _rdClientSocket = __webpack_require__("./client/reducers/rd-client-socket.js");

var _rdClientSocket2 = _interopRequireDefault(_rdClientSocket);

var _rdClientGame = __webpack_require__("./client/reducers/rd-client-game.js");

var _rdClientGame2 = _interopRequireDefault(_rdClientGame);

var _rdClientUser = __webpack_require__("./client/reducers/rd-client-user.js");

var _rdClientUser2 = _interopRequireDefault(_rdClientUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reduxImmutable.combineReducers)({
  app: _rdClientApp2.default,
  user: _rdClientUser2.default,
  socket: _rdClientSocket2.default,
  game: _rdClientGame2.default
  // , routing: routerReducer
});

/***/ }),

/***/ "./client/reducers/rd-client-app.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = __webpack_require__(0);

var _redux = __webpack_require__("./shared/utils/redux.js");

exports.default = (0, _redux.createReducer)((0, _immutable.Map)(), {});

/***/ }),

/***/ "./client/reducers/rd-client-game.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = __webpack_require__(0);

var _redux = __webpack_require__("./shared/utils/redux.js");

var _reselect = __webpack_require__(1);

var _ClientGameModel = __webpack_require__("./client/models/game/ClientGameModel.js");

var _ClientGameModel2 = _interopRequireDefault(_ClientGameModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

exports.default = (0, _redux.createReducer)(new _ClientGameModel2.default(), {
  gameClientInput: function gameClientInput(state, _ref) {
    var inputPack = _ref.inputPack;
    return state.updateIn(['inputs'], function () {
      var inputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.List)();
      return inputs.push(inputPack);
    });
  },
  gameClientProcess: function gameClientProcess(state, _ref2) {
    _objectDestructuringEmpty(_ref2);

    return state.update('raw', function (raw) {
      return raw.concat(inputPack);
    });
  },
  gameClientSend: function gameClientSend(state, _ref3) {
    _objectDestructuringEmpty(_ref3);

    return state.update('raw', function (raw) {
      return raw.concat(inputPack);
    });
  },
  gameStateUpdateIter: function gameStateUpdateIter(state, _ref4) {
    _objectDestructuringEmpty(_ref4);

    return state.update('raw', function (raw) {
      return raw.concat(inputPack);
    });
  },
  gameStateUpdateSync: function gameStateUpdateSync(state, _ref5) {
    var gameState = _ref5.gameState;
    return gameState;
  }
});

/***/ }),

/***/ "./client/reducers/rd-client-socket.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSocketStatus = exports.getSocket = undefined;

var _immutable = __webpack_require__(0);

var _redux = __webpack_require__("./shared/utils/redux.js");

var _reselect = __webpack_require__(1);

var getSocket = exports.getSocket = function getSocket(state) {
  return state.get('socket');
};
var getSocketStatus = exports.getSocketStatus = function getSocketStatus(state) {
  return state.getIn(['socket', 'status']);
};

exports.default = (0, _redux.createReducer)(null, {
  socketConnect: function socketConnect(state, _ref) {
    var socket = _ref.socket;
    return socket;
  },
  socketDisconnect: function socketDisconnect(state) {
    return null;
  }
});

/***/ }),

/***/ "./client/reducers/rd-client-user.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserToken = undefined;

var _immutable = __webpack_require__(0);

var _redux = __webpack_require__("./shared/utils/redux.js");

var getUserToken = exports.getUserToken = function getUserToken(state) {
  return state.getIn(['user', 'token']);
};

var storage = window.sessionStorage;

var saveState = function saveState(state) {
  storage.setItem('user', JSON.stringify(state));
  return state;
};

var loadState = function loadState() {
  return (0, _immutable.Map)(JSON.parse(storage.getItem('user') || '{}'));
};

exports.default = (0, _redux.createReducer)(loadState(), {
  authLoginSuccess: function authLoginSuccess(state, _ref) {
    var user = _ref.user;
    return saveState((0, _immutable.Map)(user));
  }
});

/***/ }),

/***/ "./client/store/apiMiddleware.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return function (store) {
    return function (next) {
      return function (action) {
        if (action && action.meta && action.meta.api) {
          return fetch('/api/' + action.meta.api, {
            method: action.meta.method || 'GET',
            body: JSON.stringify(action.data),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(function (response) {
            return response.json();
          });
        }
        return next(action);
      };
    };
  };
};

/***/ }),

/***/ "./client/store/createStore.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = __webpack_require__(0);

var _redux = __webpack_require__(3);

var _reduxThunk = __webpack_require__(5);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _apiMiddleware = __webpack_require__("./client/store/apiMiddleware.js");

var _apiMiddleware2 = _interopRequireDefault(_apiMiddleware);

var _socketMiddleware = __webpack_require__("./client/store/socketMiddleware.js");

var _socketMiddleware2 = _interopRequireDefault(_socketMiddleware);

var _questionMiddleware = __webpack_require__("./client/store/questionMiddleware.js");

var _questionMiddleware2 = _interopRequireDefault(_questionMiddleware);

var _historyMiddleware = __webpack_require__("./client/store/historyMiddleware.js");

var _historyMiddleware2 = _interopRequireDefault(_historyMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Basic Middleware


// History


var ClientRecord = function (_Record) {
  _inherits(ClientRecord, _Record);

  function ClientRecord() {
    _classCallCheck(this, ClientRecord);

    return _possibleConstructorReturn(this, (ClientRecord.__proto__ || Object.getPrototypeOf(ClientRecord)).apply(this, arguments));
  }

  return ClientRecord;
}((0, _immutable.Record)({
  app: void 0
  // , error: void 0
  , socket: void 0,
  user: void 0,
  game: void 0
}));

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

exports.default = function (history) {
  var store = (0, _redux.createStore)(__webpack_require__("./client/reducers/index.js").default, new ClientRecord(), composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _apiMiddleware2.default)(), (0, _questionMiddleware2.default)(), (0, _socketMiddleware2.default)(), (0, _historyMiddleware2.default)(history))));

  if (false) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', function () {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
};

/***/ }),

/***/ "./client/store/historyMiddleware.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (history) {
  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type === '@@historyMiddleware/push') {
          history.push(action.data);
        }
        return next(action);
      };
    };
  };
};

/***/ }),

/***/ "./client/store/questionMiddleware.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.answerQuestion = exports.askQuestion = undefined;

var _actSharedQuestions = __webpack_require__("./shared/actions/act-shared-questions.js");

var askQuestion = exports.askQuestion = function askQuestion(questionsStorage, action, next) {
  var questionId = Math.floor(Math.random() * 0x100000);
  action.data.questionId = questionId;
  return new Promise(function (resolve) {
    if (!!questionsStorage[questionId]) throw new Error('questionMiddleware');
    questionsStorage[questionId] = resolve;
    next(action);
  });
};

var answerQuestion = exports.answerQuestion = function answerQuestion(action, dispatch) {
  var _action$data = action.data,
      questionId = _action$data.questionId,
      questionAction = _action$data.questionAction;
  var socketId = action.meta.socketId.socketId;

  return Promise.resolve(dispatch(questionAction)).then(function (data) {
    dispatch((0, _actSharedQuestions.utilAnswerToClient)(questionId, data, socketId));
  });
};

exports.default = function () {
  var questionsStorage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type === _actSharedQuestions.utilQuestionType.utilQuestionToClient) {
          throw new Error('NYI');
          // return answerQuestion(action, store.dispatch)
        } else if (action.type === _actSharedQuestions.utilQuestionType.utilQuestionToServer) {
          return askQuestion(questionsStorage, action, next);
        } else if (action.type === _actSharedQuestions.utilQuestionType.utilAnswerToClient) {
          var questionId = action.data.questionId;

          if (questionsStorage[questionId]) {
            var resolve = questionsStorage[questionId];
            questionsStorage[questionId] = null;
            resolve(action.data);
          } else {
            next(action.data.action);
          }
        } else {
          return next(action);
        }
      };
    };
  };
};

/***/ }),

/***/ "./client/store/socketMiddleware.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rdClientSocket = __webpack_require__("./client/reducers/rd-client-socket.js");

exports.default = function () {
  return function (store) {
    return function (next) {
      return function (action) {
        // console.log('socketMiddleware', action);
        if (action.meta) {
          var socket = action.meta.socket || (0, _rdClientSocket.getSocket)(store.getState());
          if (!!socket && action.meta.server) {
            action.meta = null;
            socket.emit('action', action);
          }
        }
        return next(action);
      };
    };
  };
};

/***/ }),

/***/ "./server/actions/act-server-games.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server$gameJoin = exports.server$gameCreate = undefined;

var _ServerGameModel = __webpack_require__("./server/models/game/ServerGameModel.js");

var _ServerGameModel2 = _interopRequireDefault(_ServerGameModel);

var _UnitModel = __webpack_require__("./shared/models/game/UnitModel.js");

var _UnitModel2 = _interopRequireDefault(_UnitModel);

var _GameAction = __webpack_require__("./shared/models/game/GameAction.js");

var _GameAction2 = _interopRequireDefault(_GameAction);

var _actions = __webpack_require__("./shared/actions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server$gameCreate = exports.server$gameCreate = function server$gameCreate() {
  return function (dispatch, getState) {
    var game = _ServerGameModel2.default.create();
  };
};

var server$gameJoin = exports.server$gameJoin = function server$gameJoin() {
  return function (dispatch, getState) {
    // dispatch(new GameAction);
  };
};

/***/ }),

/***/ "./server/actions/act-server-sockets.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socketsClientToServer = exports.server$socketConnect = undefined;

var _actions = __webpack_require__("./shared/actions/index.js");

var _actions2 = __webpack_require__("./server/actions/index.js");

var _jsonwebtoken = __webpack_require__(2);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwtVerifyFails = function jwtVerifyFails(token) {
  try {
    _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET);
    return false;
  } catch (e) {
    console.error(e);
    return e;
  }
};

var reportError = function reportError(e) {
  console.error(e);
};

var server$socketConnect = exports.server$socketConnect = function server$socketConnect(socket) {
  return function (dispatch, getState) {
    var socketId = socket.id;
    return new Promise(function (resolve, reject) {
      socket.on('login:request', function (token) {
        var tokenValidationError = jwtVerifyFails(token);
        if (tokenValidationError) {
          reportError(tokenValidationError);
          reject(tokenValidationError);
          return;
        }
        socket.on('action', function (incomingAction, callback) {
          var action = {
            type: incomingAction.type,
            data: incomingAction.data,
            meta: { socketId: socketId }
          };
          if (!_actions2.clientToServer[action.type]) {
            reportError(new Error('No clientToServer[' + action.type + ']'));
            // if (callback) callback(false);
            return;
          }
          var result = dispatch(_actions2.clientToServer[action.type](action.data, action.meta));
          if (!!callback) {
            if (result instanceof Promise) {
              result.then(callback);
            } else {
              callback();
            }
          }
        });
        dispatch((0, _actions.socketConnect)(socket));
        dispatch((0, _actions2.server$userLogin)(socket.id));
        socket.emit('login:success', true);
        resolve();
      });
      socket.on('disconnect', function () {
        dispatch((0, _actions.socketDisconnect)(socketId));
      });
    });
  };
};

var socketsClientToServer = exports.socketsClientToServer = {
  socketLogin: function socketLogin(data) {
    return function (dispatch) {
      console.log('SOCKET LOGIN!', data);
      return 'hey!';
    };
  }
};

/***/ }),

/***/ "./server/actions/act-server-users.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server$userLogin = undefined;

var _UserModel = __webpack_require__("./shared/models/UserModel.js");

var _UserModel2 = _interopRequireDefault(_UserModel);

var _actions = __webpack_require__("./shared/actions/index.js");

var _actions2 = __webpack_require__("./server/actions/index.js");

var _rdServerGames = __webpack_require__("./server/reducers/rd-server-games.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server$userLogin = exports.server$userLogin = function server$userLogin() {
  return function (dispatch, getState) {
    var user = _UserModel2.default.new();
    var userId = user.id;
    dispatch((0, _actions.userLogin)(user));

    if (!(0, _rdServerGames.getGame)(getState(), null)) {
      dispatch((0, _actions2.server$gameCreate)());
    }

    dispatch((0, _actions2.server$gameJoin)(null, userId));
  };
};

/***/ }),

/***/ "./server/actions/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clientToServer = undefined;

var _actServerSockets = __webpack_require__("./server/actions/act-server-sockets.js");

Object.keys(_actServerSockets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actServerSockets[key];
    }
  });
});

var _actServerUsers = __webpack_require__("./server/actions/act-server-users.js");

Object.keys(_actServerUsers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actServerUsers[key];
    }
  });
});

var _actServerGames = __webpack_require__("./server/actions/act-server-games.js");

Object.keys(_actServerGames).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actServerGames[key];
    }
  });
});

var _actSharedQuestions = __webpack_require__("./shared/actions/act-shared-questions.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var clientToServer = exports.clientToServer = Object.assign({}, _actServerSockets.socketsClientToServer, _defineProperty({}, _actSharedQuestions.utilQuestionType.utilQuestionToServer, function (data, meta) {
  return (0, _actSharedQuestions.utilQuestionToServer)({
    type: _actSharedQuestions.utilQuestionType.utilQuestionToServer,
    data: data,
    meta: meta
  });
}));

/***/ }),

/***/ "./server/models/game/ServerGameModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameModel2 = __webpack_require__("./shared/models/game/GameModel.js");

var _GameModel3 = _interopRequireDefault(_GameModel2);

var _GameState = __webpack_require__("./shared/models/game/GameState.js");

var _GameState2 = _interopRequireDefault(_GameState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServerGameModel = function (_GameModel) {
  _inherits(ServerGameModel, _GameModel);

  function ServerGameModel() {
    _classCallCheck(this, ServerGameModel);

    return _possibleConstructorReturn(this, (ServerGameModel.__proto__ || Object.getPrototypeOf(ServerGameModel)).apply(this, arguments));
  }

  _createClass(ServerGameModel, [{
    key: 'update',
    value: function update(dt) {
      console.log('update', dt);
    }
  }]);

  return ServerGameModel;
}(_GameModel3.default);

ServerGameModel.create = function () {
  return new ServerGameModel();
};

exports.default = ServerGameModel;

/***/ }),

/***/ "./server/reducers/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = __webpack_require__(0);

var _reduxImmutable = __webpack_require__(4);

var _rdServerSockets = __webpack_require__("./server/reducers/rd-server-sockets.js");

var _rdServerSockets2 = _interopRequireDefault(_rdServerSockets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reduxImmutable.combineReducers)({
  sockets: _rdServerSockets2.default
  // , routing: routerReducer
});

/***/ }),

/***/ "./server/reducers/rd-server-games.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGame = undefined;

var _immutable = __webpack_require__(0);

var _redux = __webpack_require__("./shared/utils/redux.js");

var _GameAction = __webpack_require__("./shared/models/game/GameAction.js");

var _GameAction2 = _interopRequireDefault(_GameAction);

var _reselect = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getGame = exports.getGame = function getGame(state, id) {
  return state.getIn(['games', id]);
};

var gameActions = _defineProperty({}, _GameAction2.default.Type.UNIT_CREATE, function (state, id, unit) {
  return state.setIn(['units', unit.id], unit);
});

exports.default = (0, _redux.createReducer)((0, _immutable.Map)(), {
  gameCreate: function gameCreate(state, _ref) {
    var game = _ref.game;
    return state.set(game.id, game);
  },
  gameCommand: function gameCommand(state, _ref2) {
    var gameId = _ref2.gameId,
        command = _ref2.command;
    return state.update(gameId, function (game) {
      return gameActions[command].apply(gameActions, _toConsumableArray(command));
    });
  }
});

/***/ }),

/***/ "./server/reducers/rd-server-sockets.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSocket = undefined;

var _immutable = __webpack_require__(0);

var _redux = __webpack_require__("./shared/utils/redux.js");

var _reselect = __webpack_require__(1);

var getSocket = exports.getSocket = function getSocket(state, id) {
  return state.getIn(['sockets', id]);
};

exports.default = (0, _redux.createReducer)((0, _immutable.Map)(), {
  socketConnect: function socketConnect(state, _ref) {
    var socket = _ref.socket;
    return state.set(socket.id, socket);
  },
  socketDisconnect: function socketDisconnect(state, _ref2) {
    var socketId = _ref2.socketId;
    return state.remove(socketId);
  }
});

/***/ }),

/***/ "./server/store/createStore.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = __webpack_require__(0);

var _redux = __webpack_require__(3);

var _reduxThunk = __webpack_require__(5);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _socketMiddleware = __webpack_require__("./server/store/socketMiddleware.js");

var _socketMiddleware2 = _interopRequireDefault(_socketMiddleware);

var _questionMiddleware = __webpack_require__("./server/store/questionMiddleware.js");

var _questionMiddleware2 = _interopRequireDefault(_questionMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServerRecord = (0, _immutable.Record)({
  sockets: void 0
}, 'ServerRecord');

// Basic Middleware

exports.default = function () {
  var store = (0, _redux.createStore)(__webpack_require__("./server/reducers/index.js").default, new ServerRecord(), (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _socketMiddleware2.default)(), (0, _questionMiddleware2.default)())));

  if (false) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', function () {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
};

/***/ }),

/***/ "./server/store/questionMiddleware.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.answerQuestion = exports.askQuestion = undefined;

var _actSharedQuestions = __webpack_require__("./shared/actions/act-shared-questions.js");

var _actions = __webpack_require__("./server/actions/index.js");

var askQuestion = exports.askQuestion = function askQuestion(questionsStorage, action, next) {
  var questionId = Math.floor(Math.random() * 0x100000);
  action.data.questionId = questionId;
  return new Promise(function (resolve) {
    if (!!questionsStorage[questionId]) throw new Error('questionMiddleware');
    questionsStorage[questionId] = resolve;
    next(action);
  });
};

var answerQuestion = exports.answerQuestion = function answerQuestion(action, dispatch) {
  var _action$data = action.data,
      questionId = _action$data.questionId,
      questionAction = _action$data.questionAction;
  var socketId = action.meta.socketId;

  console.log('answerQuestion', questionAction);
  var questionActionFn = _actions.clientToServer[questionAction.type];
  if (questionActionFn) {
    return Promise.resolve(dispatch(questionActionFn(questionAction.data, action.meta))).then(function (data) {
      console.log('answerQuestion data', questionId, data, socketId);
      dispatch((0, _actSharedQuestions.utilAnswerToClient)(questionId, data, socketId));
    });
  }
};

exports.default = function () {
  var questionsStorage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type === _actSharedQuestions.utilQuestionType.utilQuestionToClient) {
          throw new Error('NYI');
          // return askQuestion(questionsStorage, action, next);
        } else if (action.type === _actSharedQuestions.utilQuestionType.utilQuestionToServer) {
          return answerQuestion(action, store.dispatch);
        } else if (action.type === _actSharedQuestions.utilQuestionType.utilAnswerToServer) {
          var questionId = action.data.questionId;

          if (questionsStorage[questionId]) {
            var resolve = questionsStorage[questionId];
            questionsStorage[questionId] = null;
            resolve(action.data);
          } else {
            next(action.data.action);
          }
        } else {
          return next(action);
        }
      };
    };
  };
};

/***/ }),

/***/ "./server/store/socketMiddleware.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rdServerSockets = __webpack_require__("./server/reducers/rd-server-sockets.js");

exports.default = function () {
  return function (store) {
    return function (next) {
      return function (action) {
        if (action.meta) {
          var socketId = action.meta.socketId;
          if (socketId) {
            var socket = (0, _rdServerSockets.getSocket)(store.getState(), socketId);
            if (!!socket) {
              socket.emit('action', action);
            }
          }
        }
        next(action);
      };
    };
  };
};

/***/ }),

/***/ "./shared/actions/act-shared-games.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var gameCreate = exports.gameCreate = function gameCreate(game) {
  return {
    type: 'gameCreate',
    data: { game: game }
  };
};

var gameJoin = exports.gameJoin = function gameJoin(gameId, userId) {
  return {
    type: 'gameJoin',
    data: { gameId: gameId, userId: userId }
  };
};

var gameLeave = exports.gameLeave = function gameLeave(gameId, userId) {
  return {
    type: 'gameLeave',
    data: { gameId: gameId, userId: userId }
  };
};

/***/ }),

/***/ "./shared/actions/act-shared-questions.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utilAnswerToServer = exports.utilQuestionToServer = exports.utilAnswerToClient = exports.utilQuestionToClient = exports.utilQuestionType = undefined;

var _actions = __webpack_require__("./shared/actions/index.js");

var utilQuestionType = exports.utilQuestionType = {
  utilQuestionToClient: '@@questionMiddleware/utilQuestion/toClient',
  utilAnswerToClient: '@@questionMiddleware/utilAnswer/toClient',
  utilQuestionToServer: '@@questionMiddleware/utilQuestion/toServer',
  utilAnswerToServer: '@@questionMiddleware/utilAnswer/toServer'
};

// Server

var utilQuestionToClient = exports.utilQuestionToClient = function utilQuestionToClient(questionAction) {
  return {
    type: utilQuestionType.utilQuestionToClient,
    data: { questionAction: questionAction },
    meta: {}
  };
};

var utilAnswerToClient = exports.utilAnswerToClient = function utilAnswerToClient(id, data, socketId) {
  return {
    type: utilQuestionType.utilAnswerToClient,
    data: { id: id, data: data },
    meta: { socketId: socketId }
  };
};

// Client

var utilQuestionToServer = exports.utilQuestionToServer = function utilQuestionToServer(questionAction, socket) {
  return {
    type: utilQuestionType.utilQuestionToServer,
    data: { questionAction: questionAction },
    meta: { socket: socket, server: true }
  };
};

var utilAnswerToServer = exports.utilAnswerToServer = function utilAnswerToServer(id, data) {
  return {
    type: utilQuestionType.utilAnswerToServer,
    data: { id: id, data: data },
    meta: { server: true }
  };
};

/***/ }),

/***/ "./shared/actions/act-shared-sockets.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var socketConnect = exports.socketConnect = function socketConnect(socket) {
  return {
    type: 'socketConnect',
    data: { socket: socket }
  };
};

var socketDisconnect = exports.socketDisconnect = function socketDisconnect(socketId) {
  return {
    type: 'socketDisconnect',
    data: { socketId: socketId }
  };
};

/***/ }),

/***/ "./shared/actions/act-shared-users.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var userLogin = exports.userLogin = function userLogin(user) {
  return {
    type: 'userLogin',
    data: { user: user }
  };
};

var userLogout = exports.userLogout = function userLogout(userId) {
  return {
    type: 'userLogout',
    data: { userId: userId }
  };
};

/***/ }),

/***/ "./shared/actions/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actSharedQuestions = __webpack_require__("./shared/actions/act-shared-questions.js");

Object.keys(_actSharedQuestions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actSharedQuestions[key];
    }
  });
});

var _actSharedSockets = __webpack_require__("./shared/actions/act-shared-sockets.js");

Object.keys(_actSharedSockets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actSharedSockets[key];
    }
  });
});

var _actSharedUsers = __webpack_require__("./shared/actions/act-shared-users.js");

Object.keys(_actSharedUsers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actSharedUsers[key];
    }
  });
});

var _actSharedGames = __webpack_require__("./shared/actions/act-shared-games.js");

Object.keys(_actSharedGames).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actSharedGames[key];
    }
  });
});
var to$server = exports.to$server = function to$server(action) {
  action.meta.server = true;
  return action;
};

/***/ }),

/***/ "./shared/models/UserModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = __webpack_require__(0);

var _uuid = __webpack_require__(7);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserModel = function (_Record) {
  _inherits(UserModel, _Record);

  function UserModel() {
    _classCallCheck(this, UserModel);

    return _possibleConstructorReturn(this, (UserModel.__proto__ || Object.getPrototypeOf(UserModel)).apply(this, arguments));
  }

  _createClass(UserModel, null, [{
    key: 'new',
    value: function _new() {
      return new UserModel({
        id: _uuid2.default.v4()
      });
    }
  }]);

  return UserModel;
}((0, _immutable.Record)({
  id: null
}));

exports.default = UserModel;

/***/ }),

/***/ "./shared/models/game/GameAction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _immutable = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameAction = {};
exports.default = GameAction;


GameAction.Type = {
  UNIT_CREATE: 'UNIT_CREATE',
  UNIT_LOC_SET: 'UNIT_LOC_SET'
};

GameAction.Input = function (_Record) {
  _inherits(InputAction, _Record);

  function InputAction() {
    _classCallCheck(this, InputAction);

    return _possibleConstructorReturn(this, (InputAction.__proto__ || Object.getPrototypeOf(InputAction)).apply(this, arguments));
  }

  return InputAction;
}((0, _immutable.Record)({
  type: '',
  subjectId: null,
  value: null
}));

GameAction.MakeInput = {
  UNIT_LOC_ADD: function UNIT_LOC_ADD(subjectId, value) {
    return new InputAction({ type: GameAction.Type.UNIT_LOC_ADD, subjectId: subjectId, value: value });
  }
};

GameAction.MakeDelta = {
  UNIT_CREATE: function UNIT_CREATE(delta, subjectId, value) {
    return delta.setIn(['units', subjectId]);
  },
  UNIT_LOC_ADD: function UNIT_LOC_ADD(delta, subjectId, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];

    return delta.mergeIn(['units', subjectId, 'loc'], { x: x, y: y });
  }
};

/***/ }),

/***/ "./shared/models/game/GameModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = __webpack_require__(0);

var _GameState = __webpack_require__("./shared/models/game/GameState.js");

var _GameState2 = _interopRequireDefault(_GameState);

var _GameAction = __webpack_require__("./shared/models/game/GameAction.js");

var _GameAction2 = _interopRequireDefault(_GameAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getTimestamp = function getTimestamp() {
  return process.hrtime();
};

var GameModel = function () {
  function GameModel() {
    var _this = this;

    _classCallCheck(this, GameModel);

    this.onFrame = function () {
      var timeNow = getTimestamp();
      _this.timeDelta = timeNow - _this.timeLast;
      while (_this.timeDelta > _this.step) {
        _this.timeDelta -= _this.step;
        _this.update(_this.step);
      }
      _this.render(_this.timeDelta);
      _this.timeLast = timeNow;
      _this.requestFrame(_this.onFrame);
    };

    this.stepFPS = 60;
    this.step = 1e3 / this.stepFPS;
    this.timeLast = getTimestamp();
    this.requestFrame = function (fn) {
      throw new Error('Define requestFrame');
    };
  }

  _createClass(GameModel, [{
    key: 'start',
    value: function start() {
      this.requestFrame(this.onFrame);
    }
  }, {
    key: 'update',
    value: function update(dt) {}
  }, {
    key: 'render',
    value: function render(dt) {}

    // onState = (delta) => this.withMutations(game => {
    //   game.update('inputs', inputs => inputs.filter(inputPack => inputPack.timestamp > delta.timestamp));
    //   game.update('state', state => state.merge(delta));
    // });

    // processInputs() {
    //   return this.inputs.reduce((delta, inputAction) => {
    //     const updateFn = GameAction[inputAction.type];
    //     return updateFn(delta, inputAction.subjectId, inputAction.value);
    //   }, new GameState())
    // }

  }]);

  return GameModel;
}();

exports.default = GameModel;

/***/ }),

/***/ "./shared/models/game/GameState.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameState = function (_Record) {
  _inherits(GameState, _Record);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
  }

  return GameState;
}((0, _immutable.Record)({
  units: (0, _immutable.Map)()
}));

exports.default = GameState;

/***/ }),

/***/ "./shared/models/game/UnitModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = __webpack_require__(0);

var _uuid = __webpack_require__(7);

var _uuid2 = _interopRequireDefault(_uuid);

var _Point = __webpack_require__("./shared/models/geom/Point.js");

var _Point2 = _interopRequireDefault(_Point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnitModel = function (_Record) {
  _inherits(UnitModel, _Record);

  function UnitModel() {
    _classCallCheck(this, UnitModel);

    return _possibleConstructorReturn(this, (UnitModel.__proto__ || Object.getPrototypeOf(UnitModel)).apply(this, arguments));
  }

  _createClass(UnitModel, null, [{
    key: 'new',
    value: function _new() {
      return new UnitModel({
        id: _uuid2.default.v4()
      });
    }
  }]);

  return UnitModel;
}((0, _immutable.Record)({
  id: null,
  loc: _Point2.default.new(),
  rot: 0
}));

exports.default = UnitModel;

/***/ }),

/***/ "./shared/models/geom/Point.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Point = function (_Record) {
  _inherits(Point, _Record);

  function Point() {
    _classCallCheck(this, Point);

    return _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).apply(this, arguments));
  }

  _createClass(Point, null, [{
    key: 'new',
    value: function _new() {
      return new Point();
    }
  }]);

  return Point;
}((0, _immutable.Record)({
  x: 0,
  y: 0
}));

exports.default = Point;

/***/ }),

/***/ "./shared/utils/redux.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReducer = createReducer;
function createReducer(initialState, reducerMap) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var reducer = reducerMap[action.type];
    return reducer ? reducer(state, action.data, action.user) : state;

    // With mutations?
    //if (reducer) {
    //  if (state && state.asMutable) {
    //    const result = reducer(state.asMutable(), action.data, action.user);
    //    if (result) {
    //      return result.asImmutable();
    //    } else {
    //      return null;
    //    }
    //  } else {
    //    return reducer(state, action.data, action.user);
    //  }
    //} else {
    //  return state;
    //}
  };
}

/***/ }),

/***/ "./test/setup/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


global.window = {};
window.localStorage = __webpack_require__("./test/setup/local-storage-mock.js").default();
window.sessionStorage = __webpack_require__("./test/setup/local-storage-mock.js").default();
global.WebSocket = __webpack_require__(11); // Hack for https://github.com/socketio/engine.io-client/blob/master/lib/transports/websocket.js#L13
window.performance = {
  now: function now() {
    return process.hrtime();
  }
};

/***/ }),

/***/ "./test/setup/local-storage-mock.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = storageMock;
function storageMock() {
  var storage = {};

  return {
    setItem: function setItem(key, value) {
      storage[key] = value || '';
    },
    getItem: function getItem(key) {
      return storage[key] || null;
    },
    removeItem: function removeItem(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function key(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}

/***/ }),

/***/ "./test/test-entry.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClient = exports.createServer = undefined;

__webpack_require__("./test/setup/index.js");

var _socket = __webpack_require__(10);

var _socket2 = _interopRequireDefault(_socket);

var _socket3 = __webpack_require__(6);

var _socket4 = _interopRequireDefault(_socket3);

var _jsonwebtoken = __webpack_require__(2);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _createStore = __webpack_require__("./server/store/createStore.js");

var _createStore2 = _interopRequireDefault(_createStore);

var _createStore3 = __webpack_require__("./client/store/createStore.js");

var _createStore4 = _interopRequireDefault(_createStore3);

var _createMemoryHistory = __webpack_require__(9);

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _actions = __webpack_require__("./server/actions/index.js");

var _actions2 = __webpack_require__("./client/actions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SOCKET_URL = 'http://localhost:5000';

var createServer = exports.createServer = function createServer() {
  var serverStore = (0, _createStore2.default)();
  var serverSocket = (0, _socket2.default)(5000, {
    serveClient: false,
    transports: ['websocket']
  });
  var serverPromise = new Promise(function (resolve) {
    serverSocket.on('connection', function (socket) {
      serverStore.dispatch((0, _actions.server$socketConnect)(socket)).then(resolve);
      socket.on('echo', function (data, callback) {
        console.log('server got echo');
        callback('echo returned');
      });
    });
  });
  return { serverStore: serverStore, serverPromise: serverPromise };
};

var createClient = exports.createClient = function createClient() {
  var store = (0, _createStore4.default)((0, _createMemoryHistory2.default)());
  var clientSocket = (0, _socket4.default)(SOCKET_URL, {
    'force new connection': true,
    transports: ['websocket']
  });
  store.dispatch((0, _actions2.authLoginSuccess)({ token: _jsonwebtoken2.default.sign({}, process.env.JWT_SECRET) }));
  store.dispatch((0, _actions2.client$socketConnect)(clientSocket));
  return clientSocket;
};

describe('describe', function () {
  var _this = this;

  this.timeout(1000000);
  it('it', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var _createServer, serverStore, serverPromise, clientSocket;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _createServer = createServer(), serverStore = _createServer.serverStore, serverPromise = _createServer.serverPromise;
            clientSocket = createClient();
            _context.next = 4;
            return new Promise(function (resolve) {
              return clientSocket.on('connect', function () {
                resolve();
              });
            });

          case 4:
            console.log(serverStore.getState());
            _context.next = 7;
            return serverPromise;

          case 7:
            _context.next = 9;
            return new Promise(function (resolve) {
              clientSocket.emit('echo', 'echo', function () {
                var _console;

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                (_console = console).log.apply(_console, ['emit'].concat(args));
                resolve();
              });
            });

          case 9:
            _context.next = 11;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            });

          case 11:
            console.log(serverStore.getState());

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
});

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("reselect");

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(8);
module.exports = __webpack_require__("./test/test-entry.js");


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("redux-immutable");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("history/createMemoryHistory");

/***/ })

/******/ });
//# sourceMappingURL=server.bundle.js.map