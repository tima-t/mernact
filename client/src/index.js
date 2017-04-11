import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import App from './App';
import Admin from './Admin';
import AdminLogin from './AdminLogin';
import './index.css';
import PrivateRoute from './components/PrivateRoute';

ReactDOM.render(
	<Router>
		<switch>
			<Route exact path='/' component={App} />
			<Route path='/admin_login' component={AdminLogin} />
			<PrivateRoute path='/admin' component={Admin} />
		</switch>
	</Router>,
	document.getElementById('root')
);
