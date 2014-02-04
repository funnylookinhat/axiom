/**
 * Engine.prototype.entity._update
 */

var async = require('async');

module.exports = function _update (engine, entity, timeDelta, callback) {
  if( ! callback ) callback = function () { /* NADA */ };

  var gravity = -0.02;

  async.series(
    [
      // Update Velocity 
      function (seriesCallback) {
        // Check for gravity and such - this should really be scripted somehow
        
      	return seriesCallback();
      },

      // Update Location
      function (seriesCallback) {

      	return seriesCallback();
      }
    ],
    callback
  );
}