import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './layout.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, withFirestore } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class AppNavBar extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
    };

  render() {
    const { isAuthenticated } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark gradient-button-4 mb4">
            <div className="container">
                <Link to="/" className="navbar-brand">
                     Client pannel
                    </Link>
                { isAuthenticated ? (
                    
                    <a href="!#" style={{float:"right", color: 'white'}} onClick={(event) => this.onLogoutClick(event)}>Logout</a>
                ): null}
                <button className="navbar-toggler" type="button"
                data-toggle="collapse"
                data-target="#navbarMain"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                {/* <div className="collapse navbar-collapse" id="navbarMain">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link to="/" className="nav-link">
                        Dashboard
                      </Link>
                    </li>
                  </ul>
                </div> */}
            </div>
        </nav>
      </div>
    )
  }
}

AppNavBar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth  }))
)(AppNavBar);