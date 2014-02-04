/**
 * Engine.prototype.loop._run
 */

var async = require('async');

module.exports = function _update (engine, timeDelta, callback) {
  
  async.series(
    [
      // Update Entities
      function (seriesCallback) {
        async.each(
          engine._entities,
          function (entity, eachCallback) {
          	engine.entity._update(entity, eachCallback);
          },
          seriesCallback
        );
      }
    ],
    callback
  );
}