import React, { Component } from 'react';
import PageWrapper from './PageWrapper';
import $ from 'jquery'
import {
	Link
} from 'react-router-dom';

class PageBuilder extends Component {


	constructor(props) {
		super(props);
		this.state = { "isAuthenticated": true, "operation": "stay", "execute": true };
		this.handlePageSelect = this.handlePageSelect.bind(this);
		this.pageContentUpdated = this.pageContentUpdated.bind(this);
		this.handlePageSelect(this.props.match.params.pageName || "home");
	}

	pageContentUpdated(){
		this.setState({
			"page_content": ""
		})
	}

	handlePageSelect(pageName) {
		let that = this;
		$.get( localStorage.getItem("server") + "/api/get_page_structure", { "pageName": pageName }, function (data) {
			that.setState({
				"selectedPage": pageName ,
				"page_content": (data.resp.pageStructure || ""),
				"elementId": "",
			})
		}, "json")
			.fail(function (response) {
				alert("Error" + response.responseText);
			});
	}

	render() {
		 if(this.props.match.params.pageName && (this.state.selectedPage != this.props.match.params.pageName)){
			this.handlePageSelect(this.props.match.params.pageName);
		 }
		return (
			<div className={"PageBuilder " + this.state.selectedPage }>
				<PageWrapper clientMode={true} pageContentUpdated={this.pageContentUpdated}  page_content={this.state.page_content || ""} selectedPage={this.props.match.params.pageName } elementRemovedFinished={this.elementRemovedFinished} operation={this.state.operation} elementId={this.state.elementId} propertyName={this.state.propertyName} propertyVal={this.state.propertyVal} componentClicked={this.componentClicked} />
			</div>
		);
	}
}

export default PageBuilder;
