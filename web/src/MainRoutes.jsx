import React, {PropTypes} from 'react';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import ProfilePage from './components/profile/ProfilePage';
import AboutPage from './components/about/AboutPage';
import AuthorizePage from './components/oauth2/AuthorizePage';
import AuthorizeError from './components/oauth2/AuthorizeError';
import NotFoundPage from './components/common/NotFoundPage';
import querySerializer from './service/querySerializer';

import {createHistory, useBasename} from 'history';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';

class MainRoutes extends React.Component {
  constructor() {
    super();
    this.onEnter = this.onEnter.bind(this);
  }
  onEnter(nextState, replace, callback) {
    var payload, isInitializing;
    var check = function() {
      payload = this.props.user.get('payload').toObject();
      isInitializing = this.props.user.get('isInitializing');
      if (payload.username) {
        callback();
      } else if (isInitializing) {
        setTimeout(check, 100);
      } else {
        if (window.location.search) {
          window.location = '/login' + window.location.search + '&callback=' + window.location.pathname;
        } else {
          window.location = '/login?callback=' + window.location.pathname;
        }
      }
    }.bind(this);

    check();
  }
  shouldComponentUpdate(nextProps, nextState) {
    //React-Router Error if return true
    return false;
  }
  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute components={HomePage}/>
            <Route name="home" path="home" components={HomePage}/>
            <Route path="register" components={RegisterPage}/>
            <Route onEnter={this.onEnter} path="profile" components={ProfilePage}/>
            <Route onEnter={this.onEnter} path="authorize" components={AuthorizePage}/>
            <Route path="authorizeerror" components={AuthorizeError}/>
            <Route path="login" components={LoginPage}/>
            <Route path="about" components={AboutPage}/>
            <Route path="*" components={NotFoundPage}/>
          </Route>
        </Router>
      </div>
    );
  }
}

var selector = function(state) {
  return {user: state.user};
};
export default connect(selector)(MainRoutes);
