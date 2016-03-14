var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var validator = require('validator');

var Code = new Schema({
  code: {
    type: String,
  },
  clientId: {
    type: String
  },
  redirectUri:{
    type: String,
  },
  username:{
    type: String,
  }
});

module.exports = mongoose.model('Code', Code);
