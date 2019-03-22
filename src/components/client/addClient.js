import React, { Component } from 'react'
import { Link } from "react-router-dom";
import '../layout/layout.css';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        balance: ''
    };
    componentDidMount(){
        this.setState({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            balance: ''
        })
    }
    onchange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        const newClient = this.state;
        const {firestore, history } = this.props;
        if( newClient.balance === ''){
            newClient.balance = 0;
        }

        firestore.add({ collection: 'clients'}, newClient)
        .then( () => history.push('/'));
        
        e.preventDefault();
    }
  render() {
    return (
      <div>
        <div className="row">
            <div className='col-md-6'>
                <Link to='/'>
                <h3><i className="fas fa-arrow-left"></i></h3>
                </Link>
            </div>
        </div>
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        Add new Client
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={(event) => this.onSubmit(event)}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="form-control"
                                name="firstName"
                                minLength="2"
                                required
                                onChange={(event) => this.onchange(event)}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="form-control"
                                name="lastName"
                                minLength="2"
                                required
                                onChange={(event) => this.onchange(event)}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                className="form-control"
                                name="email"
                                required
                                onChange={(event) => this.onchange(event)}
                                value={this.state.email}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Phone"
                                className="form-control"
                                name="phone"
                                minLength="10"
                                required
                                onChange={(event) => this.onchange(event)}
                                value={this.state.phone}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Balance"
                                className="form-control"
                                name="balance"
                                onChange={(event) => this.onchange(event)}
                                value={this.state.balance}
                            />
                        </div>
                        <input type="submit" value="Add" className="btn gradient-button-5 btn-block"/>
                    </form>
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
      </div>
    )
  }
}

export default firestoreConnect()(AddClient);