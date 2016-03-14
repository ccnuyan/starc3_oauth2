import actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import querySerializer from '../../service/querySerializer';
import fetchHelper from './fetchHelper';

//initialize
function beforeIntialize() {
  var type = actionTypes;
  return {
    type: actionTypes.BEFORE_OAUTH2_INITIALIZE
  };
}

function afterIntialize(json) {
  return {
    type: actionTypes.AFTER_OAUTH2_INITIALIZE,
    result: json
  };
}

function errorIntialize(error) {
  return {
    type: actionTypes.ERROR_OAUTH2_INITIALIZE,
    error: error
  };
}

function dispatchIntializeAsync(query) {
  return (dispatch, getState) => {
    return dispatch(initialize(query));
  };
}

function initialize(query) {
  return dispatch => {
    dispatch(beforeIntialize());
    var token = window.localStorage.getItem('userToken');
    return fetch(__HOST + `/oauth2/authorize?` + querySerializer(query), {
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

//initialize
function beforeDecide() {
  var type = actionTypes;
  return {
    type: actionTypes.BEFORE_OAUTH2_DECIDE
  };
}

function afterDecide(json) {
  return {
    type: actionTypes.AFTER_OAUTH2_DECIDE,
    code: json.code
  };
}

function errorDecide(error) {
  return {
    type: actionTypes.ERROR_OAUTH2_DECIDE,
    error: error
  };
}

function dispatchDecideAsync(formdata) {
  return (dispatch, getState) => {
    return dispatch(decide(formdata));
  };
}

function decide(formdata) {
  return dispatch => {
    dispatch(beforeDecide());
    var token = window.localStorage.getItem('userToken');
    return fetch(__HOST + `/oauth2/authorize/decision`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(formdata)
      })
      .then(fetchHelper.checkStatus)
      .then(fetchHelper.parseJSON)
      .then(json => dispatch(afterDecide(json)))
      .catch(error => dispatch(errorDecide(error)));
  };
}

export default {
  dispatchIntializeAsync: dispatchIntializeAsync,
  dispatchDecideAsync: dispatchDecideAsync
};
