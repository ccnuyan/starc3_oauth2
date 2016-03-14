import React, {PropTypes} from 'react';
import style from './App.scss';
import Header from './common/Header';
import Footer from './common/Footer';
import helpers from '../helpers.scss';
import styleable from 'react-styleable';
import userActions from '../redux/actions/userActions';
import {connect} from 'react-redux';
import classnames from 'classnames';

class App extends React.Component {
  render() {
    var css = this.props.css;

    var isRegistering = this.props.user.get('isRegistering');
    var isLogining = this.props.user.get('isLogining');
    var isUpdating = this.props.user.get('isUpdating');

    return (
      <div className={css.app}>
        {(isRegistering || isLogining || isUpdating)
          ? <div className={css.spinnerContainer}>
              <div className={classnames(css.spinner, helpers['dead-center'])}>
                <div className={css.bounce1}></div>
                <div className={css.bounce2}></div>
                <div className={css.bounce3}></div>
              </div>
            </div>
          : ''}
        <Header></Header>
        <div className={css.pageContent}>
          {this.props.children}
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

var selector = function(state) {
  return {user: state.user};
};

App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(selector)(styleable(style)(App));
