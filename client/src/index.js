import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import AdminPanel from './AdminPanel';
import AdminLogin from './AdminLogin';
import PageBuilder from './components/PageBuilder';
import './index.css';
import PrivateRoute from './components/PrivateRoute';
//set the address of server
// example  for production http://myDomain.com:9000,
// example for localhost - http://localhost:9000 this is default
localStorage.setItem("server","http://localhost:9000" );

ReactDOM.render(
	<Router>
		<switch>
			<Route exact path='/' component={PageBuilder} />
			<Route path='/page/:pageName' component={PageBuilder} />
			<Route path='/admin_login' component={AdminLogin} />
			<PrivateRoute path='/admin' component={AdminPanel} />
		</switch>
	</Router>,
	document.getElementById('root')
);
