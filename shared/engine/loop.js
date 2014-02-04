/**
 * Engine.prototype.loop
 */

var Loop = {};

// // // // // // // // // // // // // // // // // // // // // // // // // //
// End-points
// // // // // // // // // // // // // // // // // // // // // // // // // //

Loop._init		= require('./loop/_init');
Loop._run		= require('./loop/_run');
Loop._update	= require('./loop/_update');

// // // // // // // // // // // // // // // // // // // // // // // // // //
// Extensions
// // // // // // // // // // // // // // // // // // // // // // // // // //

// None

module.exports = Loop;