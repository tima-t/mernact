import React from 'react'
import {
	Route,
	Redirect
} from 'react-router-dom'


const PrivateRoute = ({ component, ...rest }) => (
	<Route {...rest} render={props => (
		localStorage.getItem("isUserAdmin" + localStorage.getItem("admin_token")) ? (
			React.createElement(component, props)
		) : (<Redirect to="/admin_login" />)
	)} />
);

export default PrivateRoute;
