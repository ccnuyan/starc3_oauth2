var config = {};

var user = process.env.MONGO_USER;
var pass = process.env.MONGO_PASS;
var host = process.env.MONGO_HOST;
var port = process.env.MONGO_PORT;
config.dbconfig = {
  url: 'mongodb://' + user + ':' + pass + '@' + host + '/'
};
config.domain = process.env.DOMAIN;
config.port = '3000';
config.jwtsecret = process.env.JWT_SECRET;


module.exports = config;
