import React, { Component } from 'react';
import WrapperTitle from './WrapperTitle';
import TabsMenu from './TabsMenu';
import ListView from './ListView';
import ButtonsRow from './ButtonsRow';
import Popup from './Popup';
import $ from 'jquery';

class LeftWrapper extends Component {

	constructor(props) {
		super(props);
		this.state = { 'page': 'pages' };
		this.tabClick = this.tabClick.bind(this);
		this.buttonClick = this.buttonClick.bind(this);
		this.addPage = this.addPage.bind(this);
		this.removePage = this.removePage.bind(this);
		this.listClicked = this.listClicked.bind(this);
		this.getInitialPages = this.getInitialPages.bind(this);
		this.pages = [];
		this.getInitialPages();
		this.updateState = 0;
		console.log("construct");
	}

	getInitialPages() {
		let that = this;
		$.get("http://localhost:9000/api/initial_pages", function (data) {
			console.log(data);
			//return data.response.
			let pagesNames = [];
			for (let page of data.resp.pages) {
				pagesNames.push(page.name);
			}
			that.pages = pagesNames;
			that.setState({ "pagesUpdateState": ++that.updateState});
			console.log(that.updateState);
		}, "json");
	}

	tabClick(e, page) {
		e.preventDefault();
		$(".listViewSelected").removeClass('listViewSelected');
		this.setState({
			'page': page
		})
	}

	buttonClick(e, action) {
		console.log(action);
		e.preventDefault();
	}

	addPage(e, pageName) {
		let that = this;
		e.preventDefault();
		$.post("http://localhost:9000/api/add_page", { pageName: pageName }, function (data) {
			that.getInitialPages();
		}, "json")
		.fail(function(response){
			alert("Error" + response.responseText);
		});
	}

	removePage(e, pageName) {
		console.log("remove "+ pageName);
		let that = this;
		e.preventDefault();
		$.post("http://localhost:9000/api/remove_page", { pageName: pageName }, function (data) {
			that.getInitialPages();
		}, "json")
		.fail(function(response){
			alert("Error" + response.responseText);
		});
	}

	listClicked(e){
		$(".listViewSelected").removeClass('listViewSelected');
		$(e.target).addClass('listViewSelected');
		this.setState({'selectedListPage': $(e.target).text()});
	}

	render() {
		const names = ['pages', 'widgets', 'resources'],
			widgets = ['button', 'text', 'clock'],
			resources = ['images', 'videos'],
			pagesButtons = [{ width: 4, type: "btn-default", text: "add", action: "add", "dataToggle": 'modal', "dataTarget": "#addPage" },
							{ width: 4, type: "btn-primary", text: "remove", action: 'remove', "dataToggle": 'modal', "dataTarget": "#removePage" }],
			nav = { 'pages': this.pages, 'widgets': widgets, 'resources': resources, 'pagesButtons': pagesButtons };

		return (
			<div style={{ backgroundColor: '#D5D8D5' }} className="LeftWrapper col-sm-3" >
				<WrapperTitle name="Pages and widgets" />
				<TabsMenu tabClick={this.tabClick} names={names} selected={this.state.page} />
				<ListView listClicked={this.listClicked} names={nav[this.state.page]} />
				<ButtonsRow buttonClick={this.buttonClick} buttons={nav[this.state.page + 'Buttons'] || []} />
				<Popup id="addPage" successFunc={this.addPage} />
				<Popup id="removePage" page={this.state.selectedListPage}  successFunc={this.removePage} />
			</div>
		);
	}
}

export default LeftWrapper;
