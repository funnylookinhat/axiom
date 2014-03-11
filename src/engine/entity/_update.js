/**
 * Engine.prototype.entity._update
 */

module.exports = function _update (engine, data, callback) {
  if( ! callback ) callback = function () { /* NADA */ };

  var entity = engine._entities[data.id];

  if( ! entity ) 
  	return callback('Entity not found with ID: '+data.id);

  if( typeof data.position !== 'undefined' ) {
    entity.position.x = typeof data.position.x !== 'undefined' ? data.position.x : 0;
    entity.position.y = typeof data.position.y !== 'undefined' ? data.position.y : 0;
    entity.position.z = typeof data.position.z !== 'undefined' ? data.position.z : 0;
    entity.position.hold = typeof data.position.hold !== 'undefined' ? data.position.hold : false;
  }
  
  if( typeof data.angle !== 'undefined' )
    entity.angle = data.angle;

  if( typeof data.angleDelta !== 'undefined' )
    entity.angleDelta = data.angleDelta;

  // Replace with deep clone later.
  if( data.attributes ) {
    for( i in data.attributes )
      entity.attributes[i] = data.attributes[i];
  }

  engine.emit('entity.updated', {id: entity.id});
  
  return callback();
}
