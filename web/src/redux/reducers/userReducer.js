import immutable from 'immutable';
import actionTypes from '../actionTypes';
import myHumane from '../../service/myHumane';
var storage = window.localStorage;

var USER_STATE = immutable.fromJS({
  isLogining: false,
  isRegistering: false,
  isUpdating: false,
  isInitializing: false,
  payload: immutable.Map({}),
  token: ''
});

var userReducer = function(state = USER_STATE, action) {
  switch (action.type) {
    //initialize
    case actionTypes.BEFORE_INITIALIZE:
      state = state.set('isInitializing', true);
      state = state.set('payload', immutable.Map({}));
      return state;
    case actionTypes.AFTER_INITIALIZE:
      state = state.set('payload', immutable.Map(action.result.payload));
      state = state.set('isInitializing', false);

      myHumane.info('欢迎回来，' + action.result.payload.username);

      return state;
    case actionTypes.ERROR_INITIALIZE:
      state = state.set('payload', immutable.Map({}));
      state = state.set('isInitializing', false);
      storage.clear('userToken');
      return state;

      //register
    case actionTypes.BEFORE_REGISTER:
      state = state.set('payload', immutable.Map({}));
      state = state.set('isRegistering', true);
      storage.clear('userToken');
      return state;
    case actionTypes.AFTER_REGISTER:
      state = state.set('payload', immutable.Map(action.result.payload));
      state = state.set('isRegistering', false);
      storage.setItem('userToken', action.result.accessToken);

      myHumane.success('您已成功注册并登录，' + action.result.payload.username);
      
      return state;
    case actionTypes.ERROR_REGISTER:
      state = state.set('payload', immutable.Map({}));
      state = state.set('isRegistering', false);
      storage.clear('userToken');

      myHumane.error(action.error.message);

      return state;

      //login
    case actionTypes.BEFORE_LOGIN:
      state = state.set('payload', immutable.Map({}));
      state = state.set('isLogining', true);
      storage.clear('userToken');
      return state;
    case actionTypes.AFTER_LOGIN:
      state = state.set('payload', immutable.Map(action.result.payload));
      state = state.set('isLogining', false);
      storage.setItem('userToken', action.result.accessToken);

      myHumane.success('您已成功登录，' + action.result.payload.username);

      return state;
    case actionTypes.ERROR_LOGIN:
      state = state.set('payload', immutable.Map({}));
      state = state.set('isLogining', false);
      storage.clear('userToken');

      myHumane.error(action.error.message);

      return state;

      //logout
    case actionTypes.LOGOUT:
      state = state.set('payload', immutable.Map({}));
      state = state.set('isLogining', false);
      state = state.set('isRegistering', false);
      state = state.set('isInitializing', false);

      storage.clear('userToken');

      myHumane.success('您已成功注销');

      return state;

      //ModifyPwd
    case actionTypes.BEFORE_MODIFY_PASSWORD:
      state = state.set('isUpdating', true);
      return state;
    case actionTypes.AFTER_MODIFY_PASSWORD:
      state = state.set('isUpdating', false);

      myHumane.success('密码修改成功');

      return state;
    case actionTypes.ERROR_MODIFY_PASSWORD:
      // state = state.set('payload', immutable.Map({}));
      // storage.clear('userToken');
      state = state.set('isUpdating', false);

      myHumane.error(action.error.message);

      return state;

    default:
      return state;
  }
};

export default userReducer;
