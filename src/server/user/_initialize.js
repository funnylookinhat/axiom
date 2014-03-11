/**
 * Server.prototype.user._connect
 */

var async = require('async');
var _ = require('underscore');

module.exports = function _connect (server, data, callback) {
  if( ! callback ) callback = function () { /* NADA */ };

  if( ! data.socket ||
      ! data.socket.id )
    return callback('Invalid or missing socket.');
  
  async.series(
    [
      // Send necessary information to generate world.
      function (seriesCallback) {
        server._world._initClient(function (err, events) {
          for( i in events )
            data.socket.emit('axiom.world.'+events[i].name, events[i].data);
        });

        seriesCallback();
      },

      function (seriesCallback) {
        server._chat._initClient(function (err, events) {
          for( i in events )
            data.socket.emit('axiom.chat.'+events[i].name, events[i].data);
        });

        seriesCallback();
      }
    ],
    callback
  );

  return callback();
}