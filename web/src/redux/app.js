import user from './reducers/userReducer.js';
import oauth2 from './reducers/oauth2Reducer.js';
import {
  combineReducers
}
from 'redux';

const app = combineReducers({
  user:user,
  oauth2:oauth2
});

export default app;
