/**
 * Engine.prototype.terrain._heightAt
 */

module.exports = function _heightAt (engine, x, z, callback) {
  x = Math.round(x * 100) / 100;
  z = Math.round(z * 100) / 100;

  // Make sure point is in range.
  if( x < 0 || x > engine._terrain.width || z < 0 || z > engine._terrain.depth ) 
    return callback(null,undefined);

  if( Math.round(x) == x &&
      Math.round(z) == z && 
      engine._terrain.heightMap[heightMapArrayPosition(x,z)] )
    return callback(null, engine._terrain[heightMapArrayPosition(x,z)]);

  // LERP 4 Corners
  var nw = { x: Math.floor(x), z: Math.floor(z) };
  var ne = { x: Math.ceil(x), z: Math.floor(z) };
  var sw = { x: Math.floor(x), z: Math.ceil(z) };
  var se = { x: Math.ceil(x), z: Math.ceil(z) };

  nw.y = engine._terrain.heightMap[heightMapArrayPosition(nw.x,nw.z)];
  ne.y = engine._terrain.heightMap[heightMapArrayPosition(ne.x,ne.z)];
  sw.y = engine._terrain.heightMap[heightMapArrayPosition(sw.x,sw.z)];
  se.y = engine._terrain.heightMap[heightMapArrayPosition(se.x,se.z)];

  var dx = ( x - Math.floor(x) );
  var dz = ( z - Math.floor(z) );

  return callback(null, lerp(
    lerp(
      nw.y, 
      se.y, 
      ( ( 1 + dx - dz ) / 2 )
    ),
    ( dx > ( 1 - dz ) ) ? ne.y : sw.y,
    Math.abs(1 - dx - dz )
  ));
}

function lerp (v1, v2, f) {
  return v1 + (v2 - v1) * f;
}

function heightMapArrayPosition (engine, widthPosition, depthPosition) {
  return ( depthPosition * engine._terrain.width + widthPosition );
}