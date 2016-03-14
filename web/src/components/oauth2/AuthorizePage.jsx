import React, {PropTypes} from 'react';
import style from './AuthorizePage.scss';
import styleable from 'react-styleable';
import helpers from '../../helpers.scss';
import classnames from 'classnames';
import oauth2Actions from '../../redux/actions/oauth2Actions';
import userActions from '../../redux/actions/userActions';
import {connect} from 'react-redux';

class AuthorizePage extends React.Component {

  constructor() {
    super();
    this.onDecide = this.onDecide.bind(this);
    this.onSwitchUser = this.onSwitchUser.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentWillMount() {
    if (!this.props.location.search || !this.props.location.query['client_id'] || !this.props.location.query['redirect_uri'] || !this.props.location.query['state'] || !this.props.location.query['response_type']) {
      //parameters not enough
      this.context.router.push('/AuthorizeError');
    } else {
      oauth2Actions.dispatchIntializeAsync(this.props.location.query)(this.props.dispatch, () => this.props.oauth2);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var decided = this.props.oauth2.get('decided');
    var transaction = this.props.oauth2.get('transaction').toObject();
    var code = this.props.oauth2.get('code');

    if (decided && code) {
      var callbackurl = transaction.client.redirectUri + '?code=' + code + '&state=' + transaction.state;
      this.refs['buttons'].textContent = '正在跳转至 ' + this.props.oauth2.get('transaction').toObject().client.name + ', 请稍候 ...';
      window.location = callbackurl;
    }
  }

  onDecide(event) {
    event.preventDefault();
    var transactionID = this.props.oauth2.get('transaction').toObject()._id;
    var formdata = {
      transaction_id: transactionID
    };
    oauth2Actions.dispatchDecideAsync(formdata)(this.props.dispatch, () => this.props.oauth2);
  }

  onSwitchUser(event) {
    event.preventDefault();
    var query = this.props.location.query;
    query.callback = this.props.location.pathname;
    this.props.dispatch(userActions.logout());
    this.context.router.push({pathname: '/login', query: query});
  }

  onCancel(event) {
    event.preventDefault();
  }

  render() {
    var css = this.props.css;
    var query = this.props.location.query;
    var transaction = this.props.oauth2.get('transaction').toObject();
    var errorMessage = this.props.oauth2.get('errorMessage');
    var code = this.props.oauth2.get('code');
    return errorMessage
      ? (
        <div className={classnames(css.authorizePage, helpers['container-full'], helpers['horizontal-center'])}>
          <h1 className={classnames(css.primaryHeading, helpers['center'])}>Authorize</h1>
          <h1 className={classnames(css.secondaryHeading, helpers['center'])}>
            {errorMessage}</h1>
          <div>{JSON.stringify(this.props.location.query, null, 2)}</div>
        </div>
      )
      : (
        <div className={classnames(css.authorizePage, helpers['container-full'], helpers['horizontal-center'])}>
          <h1 className={classnames(css.primaryHeading, helpers['center'])}>Authorize</h1>
          {transaction._id
            ? (
              <div>
                <p>Hi
                  <strong style={{
                    margin: '0 5px'
                  }}>{' ' + !!transaction.user
                      ? transaction.user.username
                      : '' +
                        ' '}</strong>
                </p>
                <p>
                  A application named
                  <span>
                    <strong style={{
                      margin: '0 5px'
                    }}>{' ' + !!transaction.client
                        ? transaction.client.name
                        : '' +
                          ' '}</strong>
                  </span>
                  want to login with you account</p>
                <div style={{
                  display: 'none'
                }}>{transaction.client.redirectUri + '?code=' + code + '&state=' + transaction.state}</div>
              </div>
            )
            : ''}
          <div ref="buttons">
            <div className={css.buttonContainer}>
              <button onClick={this.onDecide} type="submit" data-submit-value className={classnames(helpers['successButton'], css.primaryButton)}>Ok</button>
            </div>
            <div className={css.buttonContainer}>
              <button onClick={this.onSwitchUser} type="submit" data-submit-value className={classnames(helpers['errorButton'], css.secondaryButton)}>I am not ccnuyan</button>
            </div>
            <div className={css.buttonContainer}>
              <button onClick={this.onCancel} type="submit" data-submit-value className={classnames(helpers['button'], css.defaultButton)}>Cancel</button>
            </div>
          </div>
        </div>
      );
  }
}

var selector = function(state) {
  return {user: state.user, oauth2: state.oauth2};
};

AuthorizePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(selector)(styleable(style)(AuthorizePage));
