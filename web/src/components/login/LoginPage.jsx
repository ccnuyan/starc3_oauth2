import React, {PropTypes} from 'react';
import style from './LoginPage.scss';
import styleable from 'react-styleable';
import helpers from '../../helpers.scss';
import classnames from 'classnames';
import userActions from '../../redux/actions/userActions';
import {connect} from 'react-redux';
import _ from 'lodash';
import redirect from '../../service/redirect';

class LoginPage extends React.Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.checkAndRedirect = this.checkAndRedirect.bind(this);
  }

  checkAndRedirect() {
    var payload = this.props.user.get('payload').toObject();
    if (payload.username) {
      redirect(this.context.router, this.props.location);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkAndRedirect();
  }

  componentDidMount() {
    this.checkAndRedirect();
  }

  onSubmit(event) {
    event.preventDefault();
    var password = this.refs['password'].value;
    var info = {
      username: this.refs['username'].value,
      password: password
    };

    userActions.dispatchLoginAsync(info)(this.props.dispatch, function() {
      return this.props.user;
    }.bind(this));
  }

  onRegister() {
    var query = this.props.location.query;
    this.context.router.push({pathname: '/register', query: query});
  }

  render() {
    var css = this.props.css;
    return (
      <div className={css.pageContainer}>
        <div className={classnames(css.loginPage, helpers['container-full'], helpers['horizontal-center'])}>
          <h1 className={classnames(css.primaryHeading, helpers['center'])}>登录</h1>
          {/*<div>{JSON.stringify(this.props.location.query, null, 2)}</div>*/}
          <div style={{
            display: 'none'
          }}>{this.props.location.search}</div>
          <form onSubmit={this.onSubmit}>
            <div className={classnames(helpers['field-block'])}>
              <label className={classnames(helpers['label'], helpers['label-required'])}>用户名</label>
              <input ref="username" type="text" className={classnames(helpers['input-text'])}/>
            </div>
            <div className={classnames(helpers['field-block'])}>
              <label className={classnames(helpers['label'], helpers['label-required'])}>密码</label>
              <input ref="password" type="password" className={classnames(helpers['input-text'])}/>
            </div>
            <div className={classnames(helpers['field-block'])}>
              <input type="submit" className={classnames(helpers['input-text'], css.submitButton)} value="OK"/>
            </div>
          </form>
          <div className={classnames(css.registerContainer, helpers['float-right'])}>
            <a className={classnames(helpers['font-smaller'])} onClick={this.onRegister}>
              我还没有账户, 注册一个
            </a>
          </div>
        </div>
      </div>

    );
  }
}

var selector = function(state) {
  return {user: state.user};
};

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired
};

export default connect(selector)(styleable(style)(LoginPage));
