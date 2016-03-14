var actionTypes = {
  BEFORE_INITIALIZE: null,
  AFTER_INITIALIZE: null,
  ERROR_INITIALIZE: null,

  BEFORE_REGISTER: null,
  AFTER_REGISTER: null,
  ERROR_REGISTER: null,

  BEFORE_LOGIN: null,
  AFTER_LOGIN: null,
  ERROR_LOGIN: null,

  LOGOUT: null,

  BEFORE_MODIFY_PASSWORD: null,
  AFTER_MODIFY_PASSWORD: null,
  ERROR_MODIFY_PASSWORD: null,

  BEFORE_OAUTH2_INITIALIZE: null,
  AFTER_OAUTH2_INITIALIZE: null,
  ERROR_OAUTH2_INITIALIZE: null,

  BEFORE_OAUTH2_DECIDE: null,
  AFTER_OAUTH2_DECIDE: null,
  ERROR_OAUTH2_DECIDE: null
};

Object.keys(actionTypes).forEach(function(key) {
  actionTypes[key] = key;
});

export default actionTypes;
