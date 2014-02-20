/**
 * Engine.prototype.terrain._init
 */

var async = require('async');
var PNG = require('png-js');

module.exports = function _init (engine, callback) {
  var terrainImage = null;

  async.series(
    [
      function (seriesCallback) {
        terrainImage = new PNG(engine.__baseDirectory+engine._terrainImagePath);
        return seriesCallback();
      },

      function (seriesCallback) {
        engine._terrain = {};
        engine._terrain.width = terrainImage.width;
        engine._terrain.depth = terrainImage.height;
        engine._terrain.heightMapLength = engine._terrain.width * engine._terrain.depth;
        engine._terrain.heightMap = new Float32Array(engine._heightMapLength);
        
        terrainImage.decode(function (pixels) {
          for( var i = 0; i < pixels.length; i += 4 ) {
            engine._terrain.heightMap[i/4] = engine._convertToFloat({
              r:pixels[i+0],
              g:pixels[i+1],
              b:pixels[i+2],
              a:pixels[i+3]
            });
          };

          return seriesCallback();
        });
      },

    ],
    callback
  );
}