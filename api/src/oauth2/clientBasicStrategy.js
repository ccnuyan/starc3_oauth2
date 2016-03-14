var BasicStrategy = require('passport-http').BasicStrategy;
var passport = require('passport');
var conf = require('../config/config').getConfig();
var Model = require('./models');

var strategy = new BasicStrategy(
  function(username, password, done) {
    Model.Client.findOne({
      clientId: username
    }, function(err, client) {
      if (err) {
        return done(err);
      }
      if (!client) {
        return done(null, false);
      }
      if (!client.authenticate(password)) {
        return done(null, false);
      }
      return done(null, client);
    });
  }
);

module.exports = function() {
  passport.use('client-basic', strategy);
  console.log('Strategy client-basic initialized');
};
