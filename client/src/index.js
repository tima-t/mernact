import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import App from './App';
import Admin from './Admin';
import AdminLogin from './AdminLogin';
import PageBuilder from './components/PageBuilder';
import './index.css';
import PrivateRoute from './components/PrivateRoute';

ReactDOM.render(
	<Router>
		<switch>
			<Route exact path='/' component={PageBuilder} />
			<Route path='/page/:pageName' component={PageBuilder} />
			<Route path='/admin_login' component={AdminLogin} />
			<PrivateRoute path='/admin' component={Admin} />
		</switch>
	</Router>,
	document.getElementById('root')
);
