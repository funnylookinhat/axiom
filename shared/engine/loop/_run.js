/**
 * Engine.prototype.loop._run
 */

var async = require('async');

module.exports = function _run (engine, callback) {
  // Set timeout and exit?
  var timeDelta = Date.now() - engine._loopLastTime;
  engine._loopLastTime = Date.now();

  async.series(
    [
      function (seriesCallback) {
        engine._update(engine, timeDelta, seriesCallback);
      }
    ],
    function (err) {
      if( err ) console.log(err);

      setTimeout(function() {
        engine.loop._run(engine, function (err) {
          if( err ) console.log(err);
        });
      }, Math.floor(1000 / 60));
    }
  );

  

  return callback();
}