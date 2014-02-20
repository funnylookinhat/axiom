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
      // Entities
      function (seriesCallback) {
        async.each(
          engine._entities,
          function (entity, eachCallback) {
            engine.loop.run._entity(engine, entity, timeDelta, eachCallback);
          },
          seriesCallback
        );
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