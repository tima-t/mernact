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
		this.state = { "isAuthenticated": true, "operation":"stay" };
		this.componentClicked = this.componentClicked.bind(this);
		this.componentPropChanged = this.componentPropChanged.bind(this);
		this.elementRemoved = this.elementRemoved.bind(this);
		this.elementRemovedFinished = this.elementRemovedFinished.bind(this);
	}

	handleLogOut() {
		console.log("clear local storage");
		console.log(localStorage);
		localStorage.clear();
	}

	componentClicked(comp) {
		this.setState({
			'selectedComponent': comp.type,
			'selectedComponentId': comp.id,
			'selectedComponentStyle': comp.style
		})
	}

	componentPropChanged(element){
		this.setState({
			"elementId": element.elementId,
			"propertyName": element.propertyName,
			"propertyVal": element.propertyVal
		})
	}

	elementRemoved(element){
		console.log("here remove ",element);
		this.setState({
			"elementId": element.elementId,
			"operation": "remove"
		})
	}

	elementRemovedFinished(){
		this.setState({
			"elementId": "",
			"operation": "stay"
		})
	}

	render() {
		console.log("admin state refresh");
		return (
			<div ref="adminPanel" className="AdminPanel">
				<LeftWrapper />
				<PageWrapper elementRemovedFinished={this.elementRemovedFinished} operation={this.state.operation} elementId={this.state.elementId} propertyName={this.state.propertyName} propertyVal={this.state.propertyVal} componentClicked={this.componentClicked} />
				<RigthWrapper elementRemoved={this.elementRemoved} propertyChanged={this.componentPropChanged} componentStyle={this.state.selectedComponentStyle} component={this.state.selectedComponent} componentId={this.state.selectedComponentId}/>
				<Link className="logOut" to="/" onClick={this.handleLogOut}>Log Out</Link>
			</div>
		);
	}
}

export default Admin;
