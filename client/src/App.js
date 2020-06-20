import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode'
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import store from './store';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import Accounts from './components/Accounts';
import Transactions from './components/Transactions';
import { Component } from 'react';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import AccountsAdmin from './components/AccountsAdmin';
import AccountDetails from './components/AccountDetails';
import Setting from './components/setting/Setting';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	
	// Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Route path="/" exact component={Home} />
					<Route path="/login" exact component={Login} />
					<Route path="/signup" exact component={SignUp} />
					<Switch>
						<PrivateRoute path="/dashboard" exact component={Profile} />
						<PrivateRoute path="/dashboard/accounts/user" exact component={Accounts} />
						<PrivateRoute path="/dashboard/accounts/:accountNumber" exact component={AccountDetails} />
						<PrivateRoute path="/dashboard/accounts" exact component={AccountsAdmin} />
						<PrivateRoute path="/dashboard/transactions/:transactionId" component={Transactions} />
						<PrivateRoute path="/settings" component={Setting} />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
