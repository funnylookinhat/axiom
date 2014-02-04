/**
 * Engine.prototype.entity._create
 */

var async = require('async');

module.exports = function _update (engine, data, callback) {
  if( ! callback ) callback = function () { /* NADA */ };

  var entity = {
    id: null,
    position: {
      x: 0.00,
      y: 0.00,
      z: 0.00
    },
    velocity: {
      x: 0.00,
      y: 0.00,
      z: 0.00
    },
    model: null,
    attributes: {}
  };

  // Consider moving model to attributes - it doesn't really affect the engine at all
  // beyond size/scale
  if( data.model ) entity.model = data.model;

  if( data.position ) {
    entity.position.x = data.position.x;
    entity.position.y = data.position.y;
    entity.position.z = data.position.z;
  }

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
    callback
  );
}

function generateRandomId(length) {
  var str = '';
  var pool = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVQXYZ';

  for( var i = 0; i < length; i++ )
    str += pool.charAt(Math.floor( Math.random() * pool.length ));

  return str;
}