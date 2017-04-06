import React, { Component } from 'react';
import './css/Admin.css';
import LeftWrapper from './components/LeftWrapper';
import PageWrapper from './components/PageWrapper';
import RigthWrapper from './components/RigthWrapper';
import {
	Link
} from 'react-router-dom';

class Admin extends Component {


	constructor(props) {
		super(props);
		this.state = { "isAuthenticated": true };
	}

	handleLogOut() {
		console.log("clear local storage");
		console.log(localStorage);
		localStorage.clear();
	}

	render() {
		// this.isItAllowed();
		return (
			<div ref="adminPanel" className="AdminPanel">
				<LeftWrapper />
				<PageWrapper />
				<RigthWrapper />
				<Link to="/" onClick={this.handleLogOut}>Log Out</Link>
			</div>
		);
	}
}

export default Admin;
