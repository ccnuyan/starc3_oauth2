import React, {PropTypes} from 'react';
import style from './AuthorizePage.scss';
import styleable from 'react-styleable';
import helpers from '../../helpers.scss';
import classnames from 'classnames';
import userActions from '../../redux/actions/userActions';
import {connect} from 'react-redux';

class AuthorizeError extends React.Component {
  render() {
    var css = this.props.css;
    return (
      <div className={css.pageContainer}>
        <div className={classnames(css.authorizePage, helpers['container-full'], helpers['horizontal-center'])}>
          <h1 className={classnames(css.primaryHeading, helpers['center'])}>Authorize Error</h1>
          <div>oauth2 error</div>
        </div>
      </div>
    );
  }
}

var selector = function(state) {
  return {user: state.user};
};

AuthorizeError.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(selector)(styleable(style)(AuthorizeError));
