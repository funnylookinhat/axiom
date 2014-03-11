/**
 * Server.prototype.user._connect
 */

var async = require('async');
var _ = require('underscore');

module.exports = function _send (chat, data, callback) {
  if( ! callback ) callback = function () { /* NADA */ };

  if( ! data.id ||
      ! data.data )
    return callback('Invalid or missing socket.');
  
  var message = {
  	username: chat._server._users[data.id].username,
  	text: data.text
  };

  chat._messages.push(message);

  while( chat._messages.length > 100 )
  	chat._messages.splice(0,1);

  chat.emit('message.created',message);

  return callback();
}