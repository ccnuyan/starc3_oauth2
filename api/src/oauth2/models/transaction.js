var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var validator = require('validator');

var Transaction = new Schema({
  state: {
    type: String,
  },
  username: {
    type: String
  },
  clientId: {
    type: String
  },
  redirectUri: {
    type: String
  },
  responseType: {
    type: String
  },
  scope: {
    type: String
  },
  luanched: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Transaction', Transaction);
