var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var passport = require('passport');
var conf = require('../config/config').getConfig();
var Model = require('./models');

var strategy = new ClientPasswordStrategy(
  function(clientId, clientSecret, done) {
    Model.Client.findOne({
      clientId: clientId
    }, function(err, client) {
      if (err) {
        return done(err);
      }
      if (!client) {
        return done(null, false);
      }
      if (!client.authenticate(clientSecret)) {
        return done(null, false);
      }
      return done(null, client);
    });
  }
);

module.exports = function() {
  passport.use('client-password', strategy);
  console.log('Strategy client-password initialized');
};
