import React, { Component } from 'react';
import './css/Admin.css';
import LeftWrapper from './componnets/LeftWrapper';
import PageWrapper from './componnets/PageWrapper';
import RigthWrapper from './componnets/RigthWrapper';
import $ from "jquery"
import {
	Link, Redirect
} from 'react-router-dom';

class Admin extends Component {


	constructor(props) {
		super(props);
		this.state = { 'isAdmin': false };
	}

	componentDidMount() {
		if (this.refs.adminPanel) {
			console.log("here");
			let that = this;
			$.post("http://localhost:9000/api/auth_user", { "name": localStorage.getItem("admin_name"), "token": localStorage.getItem("admin_token") }, function (data) {
				this.data.resp == "OK";
				that.setState({ "isAdmin": true });
			}, "json")
				.fail(function (response) {
					this.setState({ "isAdmin": false });
				});
		}
	}

	handleLogOut() {
		console.log("clear local storage");
		console.log(localStorage);
		localStorage.clear();
	}

	render() {


		return (
			<div ref="adminPanel" className="AdminPanel">
				<LeftWrapper />
				<PageWrapper />
				<RigthWrapper />
				<Link to="/" onClick={this.handleLogOut}>Log Out</Link>
				{this.state.isAdmin && <Redirect to="./admin_login" />}
			</div>
		);
	}
}

export default Admin;
