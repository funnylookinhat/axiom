/**
 * Axiom Server - Manages connections and emits events to clients.
 */

// Basic HTTP Delivery with Express
var _ = require('underscore');
var fs = require('fs');
var socketio = require('socket.io');
var http = require('http');
var util = require('util');
var async = require('async');
var express = require('express');
var events2 = require('eventemitter2');

var Server = function (params) {
  // Any other configuration...
  this._port = params.port;
  this.__baseDirectory = params.baseDirectory;

  this._users = null;
  this._messages = null;

  this._engine = null;

  // Client delivery
  this._express = null;
  this._httpServer = null;

  this._socket = null;
}

util.inherits(Server, events2.EventEmitter2);

Server.prototype.init = function (callback) {
  var _this = this;

  _this._users = [];
  _this._messages = [];

  async.series(
    [
      // Init Engine
      function (seriesCallback) {
        
        seriesCallback();
      },

      // Init Events
      function (seriesCallback) {
        _this._initEvents(seriesCallback);
      },

      // Setup Networking
      function (seriesCallback) {
        _this._initNetworking(seriesCallback);
      }

    ],
    callback
  ); 
}

Server.prototype._initEvents = function (callback) {
  //
  
  return callback();
}

Server.prototype._initNetworking = function (callback) {
  _this._express = express();

  _this._express.use('/', express.static(_this.__baseDirectory+'/client'));

  _this._httpsServer = http.createServer(_this._express);
  _this._httpsServer.listen(_this._port);

  _this._socket = socketio();
  _this._socket.listen(_this._httpsServer,{log: false});

  return callback();
}