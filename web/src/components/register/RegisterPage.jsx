import React, {PropTypes} from 'react';
import style from './RegisterPage.scss';
import styleable from 'react-styleable';
import helpers from '../../helpers.scss';
import classnames from 'classnames';
import userActions from '../../redux/actions/userActions';
import {connect} from 'react-redux';
import redirect from '../../service/redirect';

class RegisterPage extends React.Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
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

    var password1 = this.refs['password1'].value;
    var password2 = this.refs['password2'].value;

    if (password1 != password2) {
      //TODO dosomething when not matched
      return;
    }

    var info = {
      username: this.refs['username'].value,
      email: this.refs['email'].value,
      password: password1
    };

    userActions.dispatchRegisterAsync(info)(this.props.dispatch, function() {
      return this.props.user;
    }.bind(this));
  }
  render() {
    var css = this.props.css;

    return (
      <div className={css.pageContainer}>
        <div className={classnames(css.registerPage, helpers['container-full'], helpers['horizontal-center'])}>
          <h1 className={classnames(css.primaryHeading, helpers['center'])}>注册</h1>
          <div style={{
            display: 'none'
          }}>{this.props.location.search}</div>
          <form onSubmit={this.onSubmit}>
            <div className={classnames(helpers['field-block'])}>
              <label className={classnames(helpers['label'], helpers['label-required'])}>用户名</label>
              <input ref="username" type="text" className={classnames(helpers['input-text'])}/>
            </div>
            <div className={classnames(helpers['field-block'])}>
              <label className={classnames(helpers['label'], helpers['label-required'])}>电子邮箱</label>
              <input ref="email" type="email" className={classnames(helpers['input-text'])}/>
            </div>
            <div className={classnames(helpers['field-block'])}>
              <label className={classnames(helpers['label'], helpers['label-required'])}>密码(6-16个字符)</label>
              <input ref="password1" type="password" className={classnames(helpers['input-text'])}/>
            </div>
            <div className={classnames(helpers['field-block'])}>
              <label className={classnames(helpers['label'], helpers['label-required'])}>确认密码</label>
              <input ref="password2" type="password" className={classnames(helpers['input-text'])}/>
            </div>
            <div className={classnames(helpers['field-block'])}>
              <input type="submit" className={classnames(helpers['input-text'], css.submitButton)} value="OK"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

var selector = function(state) {
  return {user: state.user};
};

RegisterPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(selector)(styleable(style)(RegisterPage));
