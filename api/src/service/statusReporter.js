var jwt = require('jwt-simple');
var conf = require('../config/config').getConfig();

var Response = function(status, message) {
  return {
    status: status,
    message: message
  };
};

var localInfo = {
  id: 'local',
  type: 'bs',
  domain: conf.domain,
};


var success = function(res) {
  res.status(200).send(Response('success', '成功'));
};

var notEnoughParameters = function(res) {
  res.status(400).send(Response('failure', '未提供用户参数'));
};

var clientTypeError = function(res) {
  res.status(400).send(Response('success', '客户端类型错误，不允许使用这种认证方式'));
};

var userNotExisted = function(res) {
  res.status(400).send(Response('failure', '用户不存在'));
};

var usernameOrPasswordWrong = function(res) {
  res.status(400).send(Response('failure', '用户名/密码错误'));
};

var authenticationFailed = function(res) {
  res.status(400).send(Response('failure', '未授权'));
};

var toBeModifiedPasswordWrong = function(res) {
  res.status(400).send(Response('failure', '旧密码无法通过验证'));
};

var notAllowed = function(res) {
  res.status(401).send(Response('failure', '不允许这样做'));
};

var codeNotFound = function(res) {
  res.status(400).send(Response('failure', '没有找到代码，可能它已经过期了'));
};

var userValidationError = function(res, error) {
  res.status(400).send(Response('failure', error));
};

var createAndSendToken = function(res, user, client) {

  var info = client ? {
    id: client.clientId,
    type: client.clientType,
    domain: client.clientType === 'bs' ? client.domain : '*',
  } : localInfo;

  var payload = {
    id: user._id,
    username: user.username,
    from: 'host',
    to: client ? client.clientId : 'local',
    client: info,
  };

  var token = jwt.encode(payload, conf.jwtsecret);

  res.status(200).send({
    payload: payload,
    accessToken: token
  });
};


module.exports = {
  userNotExisted: userNotExisted,
  clientTypeError: clientTypeError,
  notEnoughParameters: notEnoughParameters,
  usernameOrPasswordWrong: usernameOrPasswordWrong,
  authenticationFailed: authenticationFailed,
  toBeModifiedPasswordWrong: toBeModifiedPasswordWrong,
  notAllowed: notAllowed,
  success: success,
  createAndSendToken: createAndSendToken,
  userValidationError: userValidationError
};
