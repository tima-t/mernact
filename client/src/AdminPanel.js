import React, { Component } from 'react';
import './css/Admin.css';
import LeftWrapper from './components/LeftWrapper';
import PageWrapper from './components/PageWrapper';
import RigthWrapper from './components/RigthWrapper';
import $ from 'jquery'
import {
	Link
} from 'react-router-dom';

class AdminPanel extends Component {


	constructor(props) {
		super(props);
		this.state = { "isAuthenticated": true, "operation": "stay" };
		this.componentClicked = this.componentClicked.bind(this);
		this.componentPropChanged = this.componentPropChanged.bind(this);
		this.elementRemoved = this.elementRemoved.bind(this);
		this.elementRemovedFinished = this.elementRemovedFinished.bind(this);
		this.handlePageSelect = this.handlePageSelect.bind(this);
		this.pageContentUpdated = this.pageContentUpdated.bind(this);
	}

	handleLogOut() {
		localStorage.removeItem("admin_name");
		localStorage.removeItem("admin_token");
	}

	componentClicked(comp) {
		this.setState({
			'selectedComponent': comp.type,
			'selectedComponentId': comp.id,
			'selectedComponentStyle': comp.style
		})
	}

	componentPropChanged(element) {
		this.setState({
			"elementId": element.elementId,
			"propertyName": element.propertyName,
			"propertyVal": element.propertyVal
		})
	}

	elementRemoved(element) {
		this.setState({
			"elementId": element.elementId,
			"operation": "remove"
		})
	}

	elementRemovedFinished() {
		this.setState({
			"elementId": "",
			"operation": "stay"
		})
	}

	pageContentUpdated() {
		this.setState({
			"page_content": ""
		})
	}

	handlePageSelect(pageName) {
		let that = this;
		$.get(localStorage.getItem("server") + "/api/admin/get_page_structure", { "pageName": pageName, "name": localStorage.getItem("admin_name"), "token": localStorage.getItem("admin_token") }, function (data) {
			that.setState({
				"selectedPage": pageName,
				"page_content": (data.resp.pageStructure || ""),
				"elementId": "",
			})
		}, "json")
			.fail(function (response) {
				alert("Error" + response.responseText);
			});
	}

	render() {
		return (
			<div ref="adminPanel" className="AdminPanel">
				<LeftWrapper handlePageSelect={this.handlePageSelect} />
				<PageWrapper pageContentUpdated={this.pageContentUpdated} page_content={this.state.page_content || ""} selectedPage={this.state.selectedPage} elementRemovedFinished={this.elementRemovedFinished} operation={this.state.operation} elementId={this.state.elementId} propertyName={this.state.propertyName} propertyVal={this.state.propertyVal} componentClicked={this.componentClicked} />
				<RigthWrapper elementRemoved={this.elementRemoved} propertyChanged={this.componentPropChanged} componentStyle={this.state.selectedComponentStyle} component={this.state.selectedComponent} componentId={this.state.selectedComponentId} />
				<Link className="logOut btn btn-warning pull-right" to="/" onClick={this.handleLogOut}>Log Out</Link>
			</div>
		);
	}
}

export default AdminPanel;
