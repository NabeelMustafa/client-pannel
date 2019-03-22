import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import '../layout/layout.css';
import Loader from '../layout/loader'
class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            isWaiting: false
        }
    }
    componentDidMount(props, state){
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
    onSubmit(e){
        const { email, password} = this.state;
        const { firebase, history} = this.props;
        // firebase.login({
        //     email,
        //     password
        // })
        // .then( () => history.push('/'))
        // .catch( err => 
        //     this.setState({
        //         error: 'Invalid credentails'
        //     })
        //     );
        this.setState({isWaiting: true})
        firebase.createUser({email, password})
        .then(() => {
            this.setState({
                email: '',
                password: '',
                error: '',
                isWaiting: true
            })
        })
        .catch( (error) => this.setState({ error: error+'', isWaiting: false}))
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
                            Register
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
                        <input type="submit" value="Register" className="btn gradient-button-5 btn-block"/>
                        <br />Have credentials??<Link to="/login">Login</Link>
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

Register.propTypes = {
    firebase: PropTypes.object.isRequired
  };

export default firebaseConnect()(Register);
