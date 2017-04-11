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
		this.componentClicked = this.componentClicked.bind(this);
	}

	handleLogOut() {
		console.log("clear local storage");
		console.log(localStorage);
		localStorage.clear();
	}

	componentClicked(comp) {
		this.setState({
			'selectedComponent': comp.type,
			'selectedComponentId': comp.id
		})
	}

	render() {
		console.log("admin state refresh");
		return (
			<div ref="adminPanel" className="AdminPanel">
				<LeftWrapper parentState={this.state} />
				<PageWrapper componentClicked={this.componentClicked} parentState={this.state} />
				<RigthWrapper componentId={this.selectedComponentId} component={this.state.selectedComponent}  parentState={this.state} />
				<Link to="/" onClick={this.handleLogOut}>Log Out</Link>
			</div>
		);
	}
}

export default Admin;
