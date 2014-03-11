/**
 * Axiom Chat
 *  - Handles messaging - events include:
 *  - axiom.chat.message.created
 */

var _ = require('underscore');
var util = require('util');
var async = require('async');
var events2 = require('eventemitter2');

var Chat = function (params) {
  this._server = params.server;
  this._messages = [];
}

util.inherits(Chat,events2.EventEmitter2);

Chat.prototype.init = function (callback) {
  var _this = this;

  async.series(
    [
      // Bind Events
      function (seriesCallback) {
        _this._initEvents(seriesCallback);
      }
    ],
    callback
  );
}

Chat.prototype._initEvents = function (callback) {
  _this.on('message.send', function (event) {
    _this.message.send(_this,event);
  });
}

Chat.prototype._initClient = function (callback) {
  var _this = this;

  var events = [];

  events.push({
    name: 'scrollback',
    data: {
      messages: _.last(_this._messages, 10)
    }
  });

  callback(null, events);
}

Chat.prototype.message = require('./chat/message');;

module.exports = Chat;