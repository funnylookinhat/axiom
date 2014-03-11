/**
 * Server.prototype.user
 */

var User = {};

// // // // // // // // // // // // // // // // // // // // // // // // // //
// End-points
// // // // // // // // // // // // // // // // // // // // // // // // // //

User._connect = require('./user/_connect');
User._initialize = require('./user/_initialize');
User._disconnect = require('./user/_disconnect');

// // // // // // // // // // // // // // // // // // // // // // // // // //
// Extensions
// // // // // // // // // // // // // // // // // // // // // // // // // //

// None

module.exports = User;