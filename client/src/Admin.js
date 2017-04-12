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
		this.componentPropChanged = this.componentPropChanged.bind(this);
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

	componentPropChanged(element){
		this.setState({
			"elementId": element.elementId,
			"propertyName": element.propertyName,
			"propertyVal": element.propertyVal
		})
	}

	render() {
		console.log("admin state refresh");
		return (
			<div ref="adminPanel" className="AdminPanel">
				<LeftWrapper />
				<PageWrapper elementId={this.state.elementId} propertyName={this.state.propertyName} propertyVal={this.state.propertyVal} componentClicked={this.componentClicked} />
				<RigthWrapper propertyChanged={this.componentPropChanged} componentId={this.selectedComponentId} component={this.state.selectedComponent} componentId={this.state.selectedComponentId}/>
				<Link to="/" onClick={this.handleLogOut}>Log Out</Link>
			</div>
		);
	}
}

export default Admin;
