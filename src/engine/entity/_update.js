/**
 * Engine.prototype.entity._create
 */

module.exports = function _create (engine, data, callback) {
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

  // Replace with deep clone later.
  if( data.attributes ) {
    for( i in data.attributes )
      entity.attributes[i] = data.attributes[i];
  }

  engine.emit('axiom.engine.entity.updated', {id: entity.id});
  
  return callback();
}
