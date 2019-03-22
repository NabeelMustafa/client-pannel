import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import '../layout/layout.css';
import Loader from '../layout/loader'
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            isWaiting: false
        }
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value,
            error: ''
        })
    }
    componentDidMount(props, state){
        this.setState({
            name:'',
            password: '',
            error: '',
            isWaiting: false
        })
    }
    onSubmit(e){
        const { email, password} = this.state;
        const { firebase, history} = this.props;
        this.setState({isWaiting: true})
        firebase.login({
            email,
            password
        })
        .then( () => {
            history.push('/')
        }
        )
        .catch( err => 
            this.setState({
                error: err+'',
                isWaiting: false
            })
            );
        
        e.preventDefault();
    }
  render() {
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
            <div className="card">
                <div className="card-body">
                    <h1 className="text-center pb-4 pt-3">
                        <span className="text-primary">
                            <i className="fas fa-lock"></i>
                            Login
                        </span>
                    </h1>
                    <form onSubmit={(event => this.onSubmit(event))}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                            type="text"
                            name="email"
                            className="form-control"
                            defaultValue={this.state.email}
                            onChange={(event) => this.onChange(event)}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                            type="password"
                            name="password"
                            className="form-control"
                            defaultValue={this.state.password}
                            onChange={(event) => this.onChange(event)}
                            required
                            />
                        </div>
                        { this.state.error ? 
                        (
                            <small>
                                <div className="alert alert-danger"><strong>Error</strong> {this.state.error}</div>
                            </small>
                         ) : null }
                        <input type="submit" value="Login" className="btn gradient-button-5 btn-block"/>
                        <br />Get credentials??<Link to="/register">Register</Link>
                        
                    </form>
                    { this.state.isWaiting ? 
                        (
                            <Loader />
                         ) : null }
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
  };

export default firebaseConnect()(Login);
