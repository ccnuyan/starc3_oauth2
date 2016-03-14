import immutable from 'immutable';
import actionTypes from '../actionTypes';
import myHumane from '../../service/myHumane';
var storage = window.localStorage;

var OAUTH2_STATE = immutable.fromJS({
  transaction: immutable.Map({}),
  isInitializing: false,
  deciding: false,
  decided: false,
  code: ''
});

var oauth2Reducer = function(state = OAUTH2_STATE, action) {
  switch (action.type) {
    //initialize
    case actionTypes.BEFORE_OAUTH2_INITIALIZE:
      state = state.set('transaction', immutable.Map({}));
      state = state.set('errorMessage', '');
      state = state.set('isInitializing', true);
      return state;
    case actionTypes.AFTER_OAUTH2_INITIALIZE:
      state = state.set('transaction', immutable.Map(action.result));
      state = state.set('errorMessage', '');
      state = state.set('isInitializing', false);
      return state;
    case actionTypes.ERROR_OAUTH2_INITIALIZE:
      state = state.set('transaction', immutable.Map({}));
      state = state.set('errorMessage', 'something wrong');
      state = state.set('isInitializing', true);
      return state;

      //initialize
    case actionTypes.BEFORE_OAUTH2_DECIDE:
      state = state.set('deciding', true);
      state = state.set('decided', false);
      state = state.set('code', '');
      return state;
    case actionTypes.AFTER_OAUTH2_DECIDE:
      state = state.set('deciding', false);
      state = state.set('decided', true);
      state = state.set('code', action.code);
      return state;
    case actionTypes.ERROR_OAUTH2_DECIDE:
      state = state.set('deciding', true);
      state = state.set('decided', false);
      state = state.set('code', '');
      return state;

    default:
      return state;
  }
};

export default oauth2Reducer;
