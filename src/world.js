/**
 * Axiom World
 *  - Manages all possible actions 
 *  - Sends updates to engine (?) server (?)
 */


var _ = require('underscore');
var util = require('util');
var async = require('async');
var events2 = require('eventemitter2');

var World = function (params) {
  
}

util.inherits(World,events2.EventEmitter2);

World.prototype.init = function (callback) {
  async.series(
  	[

  	],
  	callback
  );
}

Chat.prototype._initClient = function (callback) {
  var _this = this;

  var events = [];

  events.push({
    name: 'initialize',
    data: _this._config
  });

  callback(null, events);
}

module.exports = World;