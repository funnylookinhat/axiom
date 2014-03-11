/**
 * Engine.prototype.entity._create
 */

module.exports = function _remove (engine, data, callback) {
  if( ! callback ) callback = function () { /* NADA */ };

  var entity = engine._entities[data.id];

  if( ! entity ) 
  	return callback('Entity not found with ID: '+data.id);

  delete engine._entities[data.id];

  engine.emit('entity.removed', {id: data.id});
  
  return callback();
}
