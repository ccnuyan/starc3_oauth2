var BearerStrategy = require('passport-http-bearer').Strategy;
var passport = require('passport');
var jwt = require('jwt-simple');
var conf = require('../config/config').getConfig();
var User = require('../users/model');

var strategy = new BearerStrategy(function(token, done) {
  var user = jwt.decode(token, conf.jwtsecret);
  return done(null, user);
});

module.exports = function() {
  passport.use('bearer', strategy);
  console.log('Strategy bearer initialized');
};
