/**
 * Engine.prototype.loop.run._entity
 * At some point we'll want this to be customizable, but for now we'll implement
 * simple collision checking with the terrain and objects.
 */

var async = require('async');

module.exports = function _entity (engine, entity, timeDelta, callback) {
  if( ! callback ) callback = function () { /* NADA */ };

  var gravity = -0.02;
  var maxYVelocity = 3;
  var h = null;

  if( entity.runTimeDelta )
  {
    timeDelta += entity.runTimeDelta;
    entity.runTimeDelta = false;
  }

  if( entity.position.hold ) 
    return callback();

  async.series(
    [
      // Really cheap physics implementation for now...
      function (seriesCallback) {
        entity.position.x += entity.velocity.x * timeDelta;
        entity.position.z += entity.velocity.z * timeDelta;
        entity.angle += entity.angleDelta * timeDelta;
        
        return seriesCallback();
      },

      function (seriesCallback) {
        engine.terrain._heightAt(
          engine,
          entity.position.x, 
          entity.position.z,
          function (err, height) {
            if( err ) return seriesCallback(err);
            h = height;
            return seriesCallback();
          }
        );
      },

      function (seriesCallback) {
        if( entity.position.y > h ||
            entity.velocity.y > 0 ) {
          entity.position.y = gravity * timeDelta * timeDelta + entity.velocity.y * timeDelta + entity.position.y;

          entity.velocity.y = gravity * timeDelta + entity.velocity.y;
          if( Math.abs(entity.velocity.y) >= maxYVelocity )
            entity.velocity.y = ( entity.velocity.y > 0 ? 1 : -1 ) * maxYVelocity;

          if( entity.velocity.y < 0 )
            entity.attributes.fallTime += timeDelta;
        }
        
        if( entity.position.y < h ) {
          entity.position.y = h;
          entity.velocity.y = 0;
          entity.attributes.fallTime = 0;
        }

        return seriesCallback();
      }
    ],
    callback
  );
}