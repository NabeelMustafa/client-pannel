import React, { Component } from 'react';
import './App.css';
import AppNavBar from  './components/layout/AppNavBar';
import Dashboard from  './components/layout/Dashboard';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider }from 'react-redux';
import store from './store';
import addClient from './components/client/addClient';
import clientDetail from './components/client/clientDetail';
import EditClient from './components/client/EditClient';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { UserIsAuthenticated , UserIsNotAuthenticated} from './helper/auth'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
         <Router>
          <div className="App">
            <AppNavBar />
            <br />
            <div className="container">
              <Switch>
                <Route exact path='/' component={UserIsAuthenticated(Dashboard)}/>
                <Route exact path='/client/add' component={UserIsAuthenticated(addClient)}/> 
                <Route exact path='/client/:id' component={UserIsAuthenticated(clientDetail)}/> 
                <Route exact path='/client/edit/:id' component={UserIsAuthenticated(EditClient)}/> 
                <Route exact path='/login' component={UserIsNotAuthenticated(Login)}/>
                <Route exact path='/register' component={UserIsNotAuthenticated(Register)}/>                
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
