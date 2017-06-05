import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import {
	Link,Redirect
} from 'react-router-dom';
import $ from 'jquery';

class AdminLogin extends Component {
	
	constructor(props){
		super(props);
		this.state = { 'logged': false };
	}

	handleLoginClick(e) {
		let name = $("#admin_name").val();
		let pass = $("#admin_pass").val();
		let that = this;
		e.preventDefault();
		$.post("http://localhost:9000/api/admin_validate", { "name": name, "pass": pass },
			function (data) {
				if(!data.token){
					alert("Error " + data.resp);
					return;
				}
				localStorage.setItem("admin_name", name);
				localStorage.setItem("admin_token", data.token);
				localStorage.setItem("isUserAdmin" + data.token, "true");
				console.log("success");
				that.setState({"logged": true});
			}, "json")
			.fail(function (response) {
				alert("Error " + response.resp);
				return;
			});
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to MernAct</h2>
				</div>
				<br></br>
				<div className="container">
					<form>
						<div className="form-group">
							<label htmlFor="email">Admin Name:</label>
							<input type="email" className="form-control" id="admin_name" placeholder="Enter name" />
						</div>
						<div className="form-group">
							<label htmlFor="pwd">Admin Password:</label>
							<input type="password" className="form-control" id="admin_pass" placeholder="Enter password" />
						</div>
						<button className="btn btn-default" onClick={(e) => this.handleLoginClick(e)}>Submit</button>
					</form>
				</div>
				<Link to="/">Home</Link>
				{this.state.logged && <Redirect to="/admin"/>}
			</div>

		);
	}
}

export default AdminLogin;