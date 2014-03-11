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

  var user = {
    id: data.socket.id,
    entityId: null,
    username: null
  };

  async.series(
    [
      // Get a random username
      function (seriesCallback) {
        async.until(
          function () {
            return ( user.username && ! _.findWhere(server._users, {username: user.username }) );
          },
          function (untilCallback) {
            user.username = 'User'+Math.random()*(10000);
          },
          seriesCallback
        );
      },

      // Create Entity
      function (seriesCallback) {
        server._engine.entity._create(server._engine, {}, function (err, entityId) {
          if( err ) return seriesCallback(err);

          user.entityId = entityId;
          server._users[user.id] = user;

          return seriesCallback();
        });
      },
      
      // World Join Event
      function (seriesCallback) {
        server._world.emit('user.joined',{id: user.id});

        return seriesCallback();
      }
    ],
    callback
  );
}

