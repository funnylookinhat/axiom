/**
 * Engine.prototype.entity
 */

var Entity = {};

// // // // // // // // // // // // // // // // // // // // // // // // // //
// End-points
// // // // // // // // // // // // // // // // // // // // // // // // // //

Entity._init = require('./entity/_init');
Entity._create = require('./entity/_create');
Entity._update = require('./entity/_update');
Entity._remove = require('./entity/_remove');

// // // // // // // // // // // // // // // // // // // // // // // // // //
// Extensions
// // // // // // // // // // // // // // // // // // // // // // // // // //

// None

module.exports = Entity;