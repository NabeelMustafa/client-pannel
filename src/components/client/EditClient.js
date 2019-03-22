import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Loader from '../layout/loader'

class EditClinet extends Component {
    state = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        balance: '',
        boolV: true
    };
    
    onchange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const newClient = this.state;
        const {firestore, history, client } = this.props;
        if( newClient.balance === ''){
            newClient.balance = 0;
        }
        firestore.update({ collection: 'clients', doc: client.id}, newClient)
        .then( () => history.push('/'));
    }
    componentDidMount(){
        if(this.props.client)
        {
            const { firstName, lastName, email, phone, balance} = this.props.client;
            this.setState({
              firstName,
              lastName,
              email,
              phone,
              balance
            })
        }
      }
  render() {
    const { client} = this.props;
    if(client){
        return (
            <div>
        <div className="row">
            <div className='col-md-6'>
                <Link to={`/client/${this.props.match.params.id}`}>
                <h3><i className="fas fa-arrow-left"></i></h3>
                </Link>
            </div>
        </div>
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        Edit Client
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
                                defaultValue={client.firstName}
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
                                defaultValue={client.lastName}
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
                                defaultValue={client.email}
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
                                defaultValue={client.phone}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Balance"
                                className="form-control"
                                name="balance"
                                onChange={(event) => this.onchange(event)}
                                defaultValue={client.balance}
                            />
                        </div>
                        <input type="submit" value="Edit" className="btn gradient-button-5 btn-block"/>
                    </form>
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
      </div>
        );
    }
    else{
        return <Loader/>;
    }
  }
}
EditClinet.propTypes = {
    firestore: PropTypes.object.isRequired
  };
  
export default compose(
    firestoreConnect( props => [
        {collection: 'clients', storeAs: 'client', doc: props.match.params.id}
    ]),
    connect(({firestore: { ordered }}, props) => ({
      client: ordered.client && ordered.client[0]
    }))
  )(EditClinet);
