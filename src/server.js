/**
 * Axiom Server
 *  - Manages all clients, world, and master engine
 *  - Receives actions from clients, parses them and updates engine as necessary
 *  - Engine returns updates to entities which are pushed to all clients.
 */

var _ = require('underscore');
var util = require('util');
var async = require('async');
var events2 = require('eventemitter2');

var Engine = require('./engine');
var World = require('./world');
var Chat = require('./chat');

var Server = function (params) {
  this.__baseDirectory = typeof params.baseDirectory !== 'undefined' ? params.baseDirectory : '/';

  this._config = typeof params.config !== 'undefined' ? params.config : null;

  this._socket = typeof params.socket !== 'undefined' ? params.socket : null;

  // Class instances
  this._engine = null;
  this._world = null;
  this._chat = null;

  // Variables
  this._users = {};  // Hashed based on socket.id
}

util.inherits(Server, events2.EventEmitter2);

Server.prototype.init = function (callback) {
  var _this = this;

  async.series(
    [
      // Engine Init
      function (seriesCallback) {
        _this._engine = new Engine({
          baseDirectory: _this.__baseDirectory,
          config: _this._config
        });
        _this._engine.init(seriesCallback);
      },
      
      // World Init
      function (seriesCallback) {
        _this._world = new World({
          baseDirectory: _this.__baseDirectory,
          config: _this._config
        });
        _this._world.init(seriesCallback);
      },

      // Chat Init
      function (seriesCallback) {
        _this._chat = new Chat({
          baseDirectory: _this.__baseDirectory,
          config: _this._config
        });
        _this._chat.init(seriesCallback);
      },
      
      // Events Init
      function (seriesCallback) {
        _this._initEvents(seriesCallback);
      },
    ],
    callback
  );
}

// Socket Events contain
//    event
//       .name
//       .data
//    Passing them along to the appropriate handler should wrap them in a 
//    data object:
//      data
//        .event
//          .name
//          .data
//        .user
Server.prototype._initEvents = function (callback) {
  var _this = this;

  _this._socket.sockets.on('connection', function (socket) {
    
    _this.user._connect(_this, {socket: socket}, function (err) {
      if( err ) return console.dir(err);

      _this.user.initialize(_this, {socket: socket}, function (err) {
        if( err ) return console.dir(err);
      });
    });

    socket.on('axiom.ping', function (event) {
      socket.emit('axiom.pong', {ts: event.ts});
    });

    // Bind individual socket events.
    socket.on('axiom.chat', function (event) {
      _this._chat.emit(event.name,{id: socket.id, data: event.data});
    });

    socket.on('axiom.world', function (event) {
      _this._world.emit(event.name,{id: socket.id, data:event.data});
    });

    // We'll need a flag to send all entities, etc.
    // TODO - axiom.client.init event ?

  });

  _this._engine.on('entity.created', function (data) {
    _this._socket.sockets.broadcast('axiom.engine.entity.created',_this._engine._entities[data.id]);
  });

  _this._engine.on('entity.updated', function (data) {
    _this._socket.sockets.broadcast('axiom.engine.entity.updated',_this._engine._entities[data.id]);
  });

  _this._chat.on('message.created', function (data) {
    _this._sockets.sockets.broadcast('axiom.chat.message.created',data);
  });

  return callback();
}

Engine.prototype.user = require('./server/user');;

module.exports = Server;