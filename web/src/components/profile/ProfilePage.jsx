import React, {PropTypes} from 'react';
import style from './ProfilePage.scss';
import styleable from 'react-styleable';
import helpers from '../../helpers.scss';
import classnames from 'classnames';
import userActions from '../../redux/actions/userActions';
import {connect} from 'react-redux';

class ProfilePage extends React.Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
    this.resetEmail = this.resetEmail.bind(this);
  }

  onSendEmail(event) {
    event.preventDefault();
  }

  resetEmail() {}

  onSubmit(event) {
    event.preventDefault();

    var oldpassword = this.refs['password'].value;

    var password1 = this.refs['password1'].value;
    var password2 = this.refs['password2'].value;

    if (password1 != password2) {
      //TODO dosomething when not matched
      return;
    }

    var info = {
      oldpassword: oldpassword,
      newpassword: password1
    };

    userActions.dispatchModifyPasswordAsync(info)(this.props.dispatch, function() {
      return this.props.user;
    }.bind(this));
  }
  render() {
    var css = this.props.css;
    var user = this.props.user.get('payload').toObject();

    return (
      <div className={css.pageContainer}>
        <div className={classnames(css.profilePage, helpers['container-mid'])}>
          <h1 className={classnames(css.primaryHeading, helpers['center'])}>个人设定</h1>
          <h2 className={classnames(css.secondaryHeading, helpers['center'])}>邮箱</h2>
          <form onSubmit={this.resetEmail}>
            <div className={classnames(helpers['label'])}>我们将往你的邮箱中发送一封邮件，请尽快点击邮件中的链接继续设定邮箱</div>
            <div className={classnames(helpers['field-block'])}>
              <input onClick={this.onSendEmail} type="submit" className={classnames(helpers['input-text'], css.submitButton)} value={'发送确认邮件至<' + user.username + '>的邮箱'}/>
            </div>
          </form>
          <h2 className={classnames(css.secondaryHeading, helpers['center'])}>密码</h2>
          <form onSubmit={this.onSubmit}>
            <div className={classnames(helpers['field-block'])}>
              <label className={classnames(helpers['label'], helpers['label-required'])}>旧密码</label>
              <input ref="password" type="password" className={classnames(helpers['input-text'])}/>
            </div>
            <div className={classnames(helpers['field-block'])}>
              <label className={classnames(helpers['label'], helpers['label-required'])}>新密码</label>
              <input ref="password1" type="password" className={classnames(helpers['input-text'])}/>
            </div>
            <div className={classnames(helpers['field-block'])}>
              <label className={classnames(helpers['label'], helpers['label-required'])}>再次确认新密码</label>
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

ProfilePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(selector)(styleable(style)(ProfilePage));
