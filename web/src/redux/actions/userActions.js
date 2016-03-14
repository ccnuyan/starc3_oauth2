import actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import fetchHelper from './fetchHelper';

//initialize
function beforeIntialize() {
  var type = actionTypes;
  return {
    type: actionTypes.BEFORE_INITIALIZE
  };
}

function afterIntialize(json) {
  return {
    type: actionTypes.AFTER_INITIALIZE,
    result: {
      payload: json
    }
  };
}

function errorIntialize(error) {
  return {
    type: actionTypes.ERROR_INITIALIZE,
    error: error
  };
}

function dispatchIntializeAsync() {
  return (dispatch, getState) => {
    return dispatch(initialize());
  };
}

function initialize() {
  return dispatch => {
    dispatch(beforeIntialize());
    var token = window.localStorage.getItem('userToken');
    return fetch(__HOST + `/user/info`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(fetchHelper.checkStatus)
      .then(fetchHelper.parseJSON)
      .then(json => dispatch(afterIntialize(json)))
      .catch(error => dispatch(errorIntialize(error)));
  };
}


//register
function beforeRegister() {
  return {
    type: actionTypes.BEFORE_REGISTER
  };
}

function afterRegister(json) {
  return {
    type: actionTypes.AFTER_REGISTER,
    result: json
  };
}

function errorRegister(error) {
  return {
    type: actionTypes.ERROR_REGISTER,
    error: error
  };
}

function dispatchRegisterAsync(registerInfo) {
  return (dispatch, getState) => {
    return dispatch(register(registerInfo));
  };
}

function register(registerInfo) {
  return dispatch => {
    dispatch(beforeRegister(registerInfo));
    return fetch(__HOST + `/user/register`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerInfo)
      })
      .then(fetchHelper.checkStatus)
      .then(fetchHelper.parseJSON)
      .then(json => dispatch(afterRegister(json)))
      .catch(error => dispatch(errorRegister(error)));
  };
}

//login
function beforeLogin() {
  return {
    type: actionTypes.BEFORE_LOGIN
  };
}

function afterLogin(json) {
  return {
    type: actionTypes.AFTER_LOGIN,
    result: json
  };
}

function errorLogin(error) {
  return {
    type: actionTypes.ERROR_LOGIN,
    error: error
  };
}

function dispatchLoginAsync(loginInfo) {
  return (dispatch, getState) => {
    return dispatch(login(loginInfo));
  };
}

function login(loginInfo) {
  return dispatch => {
    dispatch(beforeLogin(loginInfo));
    return fetch(__HOST + `/user/login`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })
      .then(fetchHelper.checkStatus)
      .then(fetchHelper.parseJSON)
      .then(json => dispatch(afterLogin(json)))
      .catch(error => dispatch(errorLogin(error)));
  };
}

//logout
function logout() {
  return {
    type: actionTypes.LOGOUT
  };
}

//register
function beforeModifyPassword() {
  return {
    type: actionTypes.BEFORE_MODIFY_PASSWORD
  };
}

function afterModifyPassword(json) {
  return {
    type: actionTypes.AFTER_MODIFY_PASSWORD,
    result: json
  };
}

function errorModifyPassword(error) {
  return {
    type: actionTypes.ERROR_MODIFY_PASSWORD,
    error: error
  };
}

function dispatchModifyPasswordAsync(newPasswordInfo) {
  return (dispatch, getState) => {
    return dispatch(modifyPassword(newPasswordInfo));
  };
}

function modifyPassword(newPasswordInfo) {
  return dispatch => {
    dispatch(beforeModifyPassword(newPasswordInfo));
    var token = window.localStorage.getItem('userToken');
    return fetch(__HOST + `/user/modifypwd`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(newPasswordInfo)
      })
      .then(fetchHelper.checkStatus)
      .then(fetchHelper.parseJSON)
      .then(function(json) {
        if (json.status === 'failure') {
          reject(json);
        }
      })
      .then(json => dispatch(afterModifyPassword(json)))
      .catch(error => dispatch(errorModifyPassword(error)));
  };
}

export default {
  dispatchIntializeAsync: dispatchIntializeAsync,
  dispatchRegisterAsync: dispatchRegisterAsync,
  dispatchLoginAsync: dispatchLoginAsync,
  dispatchModifyPasswordAsync: dispatchModifyPasswordAsync,
  logout: logout
};
