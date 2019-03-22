import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Loader from '../layout/loader'
import classnames from 'classnames'


class ClientDetail extends Component {

    state = {
            toggleEdit: false,
            amountUpdate: ''
        };

        togleState(){
            this.setState({
                toggleEdit: !this.state.toggleEdit,
                amountUpdate: ''
            })
        }
        onChange(e){
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        balanceSubmit(e){
            e.preventDefault();
            const { client, firestore} = this.props;
            const { amountUpdate } = this.state;

            const amountToUpdate = {
                balance: parseFloat(amountUpdate)
            }

            firestore.update({collection: 'clients', doc: client.id}, amountToUpdate);
            this.togleState();
        }

        deleteClient(){
            const { client, firestore} = this.props;
            firestore.delete({collection: 'clients', doc: client.id})
            .then( () => this.props.history.push('/'));
        }
  render() {
      const { client } = this.props;
      const { amountUpdate, toggleEdit } = this.state;
      let balanceForm = '';
    // If balance form should display
    if(toggleEdit)
    {
        balanceForm = (
            <form onSubmit={(event) => this.balanceSubmit(event)}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="amountUpdate"
                  placeholder="Add New Balance"
                  value={amountUpdate}
                  onChange={(event) => this.onChange(event)}
                />
                <div className="input-group-append">
                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-outline-dark"
                  />
                </div>
              </div>
            </form>
          );
    }

    if( client){
        return (
            <div>
                <div className="row">
                    <div className='col-md-6'>
                        <Link to='/'>
                        <h3><i className="fas fa-arrow-left"></i></h3>
                        </Link>
                    </div>
                    <div className='col-md-6'>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-11">
                        <div className="card">
                            <div className="card-header">
                            <div className='row'>
                                <div className="col-md-9">
                                <h3>{client.firstName}{' '}{client.lastName}</h3>                                
                                </div>
                                <div className="col-md-3">
                                <div className="bnt-group float-right">
                                    <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                                    <i className=" fa fa-edit"></i>
                                    </Link>
                                    <button className="btn btn-danger"  onClick={() => this.deleteClient()}>
                                    <i className=" fas fa-trash"></i>
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="card-body">
                            <div className="row">
                                <div className="col-md-8 col-sm-6">
                                    <h4>
                                        Client ID: {' '}
                                        <span className="text-secondary">{client.id}</span>
                                    </h4>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                <h3>
                                    Balance: {'  '}
                                    <span className={classnames({
                                        'text-danger': client.balance > 0,
                                        'text-success': client.balance === 0
                                    })}> ${parseFloat(client.balance).toFixed(2)}

                                    
                                    </span>
                                    <small>
                                        <a href="#!" onClick={ () => this.togleState()}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>
                                    </small>
                                </h3>
                                {balanceForm}
                                </div>
                            </div>
                            <hr />
                            <ul className="list-group">
                                <li className="list-group-item">Contact Email:{' '+client.email}</li>
                                <li className="list-group-item">Contact Phone no:{' '+client.phone}</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
             </div>
          )
    }
    else{
        return<div style={{display: 'flex', justifyContent: 'center'}}>
      <br /><br /><br />
      <Loader />
    </div>
    }
  }
}

ClientDetail.propTypes = {
    firestore: PropTypes.object.isRequired
  };
  
export default compose(
    firestoreConnect( props => [
        {collection: 'clients', storeAs: 'client', doc: props.match.params.id}
    ]),
    connect(({firestore: { ordered }}, props) => ({
      client: ordered.client && ordered.client[0]
    }))
  )(ClientDetail);