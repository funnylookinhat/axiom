/**
 * Server.prototype.user._disconnect
 */

var async = require('async');
var _ = require('underscore');

module.exports = function _disconnect (server, data, callback) {
  if( ! callback ) callback = function () { /* NADA */ };

  if( ! data.socket ||
      ! data.socket.id )
    return callback('Invalid or missing socket.');
	
  var user = server._users[data.socket.id];

  async.series(
    [
      // World Leave Event
      function (seriesCallback) {
        server._world.emit('user.left',{id: user.id});

        return seriesCallback();
      }
    ],
    callback
  );
}

