import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { Router , Route , IndexRoute , browserHistory } from 'react-router';
import {AUTH_USER} from './actions/types';
const createStoreWithMiddleware = applyMiddleware(reduxThunk,logger())(createStore);


const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
// if token is present log back in 
if(token){
store.dispatch({type:AUTH_USER});

}

ReactDOM.render(
  <Provider store={store}>

    <Router history ={browserHistory} >
      <Route path ="/" component = {App} >
        <Route path="/signin" component ={Signin} />
        <Route path="/signout" component ={Signout} />
        <Route path="/signup" component ={Signup} />
		<Route path="/feature" component={RequireAuth(Feature)}/>
      </Route>
  </Router>
  </Provider>
  , document.querySelector('.container'));
