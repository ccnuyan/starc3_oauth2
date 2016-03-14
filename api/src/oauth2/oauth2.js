var uuid = require('uuid');
var passport = require('passport');
var login = require('connect-ensure-login');
var Model = require('./models');
var User = require('../users/model');
var utils = require('./utils');
var jwt = require('jwt-simple');
var conf = require('../config/config').getConfig();

var reporter = require('../service/statusReporter');

var authorize = function(req, res, next) {
  var clientId = req.query['client_id'];
  var redirectUri = req.query['redirect_uri'];
  var responseType = req.query['response_type'];
  var state = req.query['state'];
  var scope = req.query['scope'];
  if (!clientId || !redirectUri) {
    return next(new Error('application must provide client_id and redirect_uri in this step'));
  }
  Model.Client.findOne({
    clientId: clientId
  }, function(err, client) {
    if (err) {
      return next(err);
    }
    if (client.redirectUri.toLowerCase() !== redirectUri.toLowerCase()) {
      return next('Unknown redirectUri');
    }
    var transaction = new Model.Transaction({
      clientId: clientId,
      redirectUri: redirectUri,
      responseType: responseType,
      state: state,
      username: req.user.username,
      scope: scope
    });
    transaction.save(function(err, transactionObject) {
      if (err) {
        return next(err);
      }

      Model.Client.findOne({
          clientId: transactionObject.clientId
        })
        .exec(function(err, client) {
          if (err) {
            return next(err);
          }
          var t_object = transactionObject.toObject();
          t_object.client = client;
          t_object.user = req.user;
          res.status(200).send(t_object);
        });
    });
  });
};

var grant = function(req, res, next) {
  var transactionId = req.body['transaction_id'];
  Model.Transaction.findById(transactionId)
    .exec(function(err, transaction) {
      if (err) {
        return next(err);
      }

      if (req.user.username != transaction.username) {
        //这是不可能发生的
        return next('req.user.username != transaction.username');
      }

      var authoriaztionCode = new Model.Code({
        code: utils.uid(16),
        clientId: transaction.clientId,
        username: transaction.username,
        redirectUri: transaction.redirectUri
      });
      authoriaztionCode.save(function(err, code) {
        if (err) {
          return next(err);
        }
        return res.status(200).send({
          code: code.code
        });
      });
    });
};

var token = function(req, res, next) {
  var code = req.body.code;
  var client = req.user;

  if (client.clientType !== 'bs') {
    return reporter.clientTypeError(res);
  }

  Model.Code.findOne({
    code: code
  }).exec(function(err, authCode) {
    if (err) {
      return next(err);
    }
    if (!authCode) {
      return reporter.codeNotFound(res);
    }
    if (client.clientId !== authCode.clientId) {
      //这是不可能发生的
      return next('client.clientId !== authCode.clientId');
    }

    Model.Code.findOneAndRemove({
      code: code
    }).exec();
    User.findOne({
      username: authCode.username
    }, function(err, userReturn) {
      if (err) {
        return next(err);
      }
      if (!userReturn) {
        return reporter.userNotExisted(res);
      }
      return reporter.createAndSendToken(res, userReturn.toJSON(), client);
    });
  });
};

var cstoken = function(req, res, next) {
  var client = req.user;

  if (!req.body.username || !req.body.password) {
    return reporter.notEnoughParameters(res);
  }

  User.findOne({
    username: req.body.username
  }, function(err, userReturn) {
    if (err) {
      return next(err);
    }
    if (!userReturn) {
      return reporter.userNotExisted(res);
    }
    if (!userReturn.authenticate(req.body.password)) {
      return reporter.usernameOrPasswordWrong(res);
    }
    return reporter.createAndSendToken(res, userReturn.toJSON(), client);
  });
};

module.exports = {
  authorize: authorize,
  grant: grant,
  token: token,
  cstoken: cstoken
};
