/**
 * Engine.prototype.loop._init
 */

var async = require('async');

module.exports = function _init (engine, callback) {
  // Set timeout and exit?
  engine._loopLastTime = Date.now();

  setTimeout(function() {
  	engine.loop._run(engine, function (err) {
  	  if( err ) console.log(err);
  	});
  }, Math.floor(1000 / 60));

  return callback();
}