/**
 * Engine.prototype.entity._create
 */

var async = require('async');

module.exports = function _create (engine, data, callback) {
  if( ! callback ) callback = function () { /* NADA */ };

  var entity = {
    id: null,
    position: {
      x: 0.00,
      y: 0.00,
      z: 0.00,
      hold: false
    },
    velocity: {
      x: 0.00,
      y: 0.00,
      z: 0.00,
    },
    angle: 0,
    angleDelta: 0,
    runTimeDelta: false,
    attributes: {
      model: null,  // We de-normalize anything here that will be required for render.
      username: null 
    }
  };

  if( typeof data.position !== 'undefined' ) {
    entity.position.x = typeof data.position.x !== 'undefined' ? data.position.x : 0;
    entity.position.y = typeof data.position.y !== 'undefined' ? data.position.y : 0;
    entity.position.z = typeof data.position.z !== 'undefined' ? data.position.z : 0;
    entity.position.hold = typeof data.position.hold !== 'undefined' ? data.position.hold : false;
  }

  entity.direction = typeof data.direction !== 'undefined' ? data.direction : 0;

  // Replace with deep clone later.
  if( data.attributes ) {
    for( i in data.attributes )
      entity.attributes[i] = data.attributes[i];
  }

  async.series(
    [
      // Generate ID
      function (seriesCallback) {
        async.until(
          function () {
            return ( entity.id && ! engine._entities[entity.id] );
          },
          function (untilCallback) {
            entity.id = generateRandomId(10);
          },
          seriesCallback
        );
      },

      function (seriesCallback) {
        // Add the new entity.
        engine._entities[entity.id] = entity;
        seriesCallback();
      },

      function (seriesCallback) {
        engine.emit('entity.created', {id: entity.id});
      }
    ],
    function (err) {
      if( err ) return callback(err);
      callback(null, entity.id);
    }
  );
}

function generateRandomId(length) {
  var str = '';
  var pool = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVQXYZ';

  for( var i = 0; i < length; i++ )
    str += pool.charAt(Math.floor( Math.random() * pool.length ));

  return str;
}
