import React from 'react'
import {
	Route,
	Redirect
} from 'react-router-dom'


const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem("isUserAdmin" + localStorage.getItem("admin_token")) ? (
      React.createElement(component, props)
    ) : (<Redirect to="/admin_login"/>)
  )}/>
);

// function isAuthorized() {
// 		console.log("here is allowed");
// 		let that = this;
// 		$.post("http://localhost:9000/api/auth_user", { "name": localStorage.getItem("admin_name"), "token": localStorage.getItem("admin_token") }, function (data) {
// 			return this.data.resp === "OK" ? true : false
// 		}, "json")
// 			.fail(function (response) {
// 				console.log("is not admin");
// 				return false;
// 			});
// }

export default PrivateRoute;
