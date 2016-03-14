var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var validator = require('validator');

var Token = new Schema({
  token: {
    type: String,
  },
  username: {
    type: String,
  },
  clientId : {
    type: String,
  }
});

module.exports = mongoose.model('Token', Token);
