/**
 * Engine.prototype.loop
 */

var Loop = {};

// // // // // // // // // // // // // // // // // // // // // // // // // //
// End-points
// // // // // // // // // // // // // // // // // // // // // // // // // //

Loop._init		= require('./loop/_init');
Loop._run		= require('./loop/_run');

// // // // // // // // // // // // // // // // // // // // // // // // // //
// Extensions
// // // // // // // // // // // // // // // // // // // // // // // // // //

Loop.run        = require('./loop/run');

module.exports = Loop;