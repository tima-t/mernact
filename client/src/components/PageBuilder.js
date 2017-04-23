import React, { Component } from 'react';
import PageWrapper from './PageWrapper';
import $ from 'jquery'
import {
	Link
} from 'react-router-dom';

class PageBuilder extends Component {


	constructor(props) {
		super(props);
		this.state = { "isAuthenticated": true, "operation": "stay" };
		// this.componentClicked = this.componentClicked.bind(this);
		// this.componentPropChanged = this.componentPropChanged.bind(this);
		// this.elementRemoved = this.elementRemoved.bind(this);
		// this.elementRemovedFinished = this.elementRemovedFinished.bind(this);
		this.handlePageSelect = this.handlePageSelect.bind(this);
		this.pageContentUpdated = this.pageContentUpdated.bind(this);
		this.handlePageSelect(this.props.match.params.pageName || "home");
	}

	// handleLogOut() {
	// 	console.log("clear local storage");
	// 	console.log(localStorage);
	// 	localStorage.clear();
	// }

	// componentClicked(comp) {
	// 	this.setState({
	// 		'selectedComponent': comp.type,
	// 		'selectedComponentId': comp.id,
	// 		'selectedComponentStyle': comp.style
	// 	})
	// }

	// componentPropChanged(element) {
	// 	this.setState({
	// 		"elementId": element.elementId,
	// 		"propertyName": element.propertyName,
	// 		"propertyVal": element.propertyVal
	// 	})
	// }

	// elementRemoved(element) {
	// 	console.log("here remove ", element);
	// 	this.setState({
	// 		"elementId": element.elementId,
	// 		"operation": "remove"
	// 	})
	// }

	// elementRemovedFinished() {
	// 	this.setState({
	// 		"elementId": "",
	// 		"operation": "stay"
	// 	})
	// }

	pageContentUpdated(){
		this.setState({
			"page_content": ""
		})
	}

	handlePageSelect(pageName) {
		let that = this;
		$.get("http://localhost:9000/api/get_page_structure", { "pageName": pageName, "name": localStorage.getItem("admin_name"), "token": localStorage.getItem("admin_token") }, function (data) {
			console.log("page structure ", data.resp.pageStructure);
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
		console.log("page builder refreshed");
		return (
			<div className="PageBuilder">				
				<PageWrapper clientMode={true} pageContentUpdated={this.pageContentUpdated}  page_content={this.state.page_content || ""} selectedPage={this.state.selectedPage} elementRemovedFinished={this.elementRemovedFinished} operation={this.state.operation} elementId={this.state.elementId} propertyName={this.state.propertyName} propertyVal={this.state.propertyVal} componentClicked={this.componentClicked} />
			</div>
		);
	}
}

export default PageBuilder;