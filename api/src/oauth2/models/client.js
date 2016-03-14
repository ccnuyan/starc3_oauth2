var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var validator = require('validator');
var _ = require('lodash');

var Client = new Schema({
  name: {
    type: String,
  },
  clientId: {
    type: String,
    unique: 'clientId already exists',
    required: 'Please fill in a clientId',
    validate: {
      validator: function(v) {
        return /^[a-zA-z][a-zA-Z0-9_]{3,15}$/.test(v);
      },
      message: '{VALUE} is not a valid clientId'
    },
    trim: true
  },
  salt: {
    type: String,
  },
  clientSecret: {
    type: String
  },
  clientType: {
    type: String,
    enum: ['bs', 'cs'],
    required: 'Please provide clientType',
  },
  domain: {
    type: String,
  },
  redirectUri: {
    type: String
  }
});

Client.methods.hashPassword = function(clientSecret) {
  if (this.salt && clientSecret) {
    return crypto.pbkdf2Sync(clientSecret, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
  } else {
    return clientSecret;
  }
};

Client.pre('save', function(next) {
  var user = this;
  if (this.clientSecret && this.isModified('clientSecret')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.clientSecret = this.hashPassword(this.clientSecret);
  }

  next();
});

Client.methods.toJSON = function() {
  var client = this.toObject();
  return _.pick(client, ['name', 'clientId', 'redirectUri']);
};

Client.methods.authenticate = function(clientSecret) {
  var isMatch = this.clientSecret === this.hashPassword(clientSecret);
  return isMatch;
};

module.exports = mongoose.model('Client', Client);
