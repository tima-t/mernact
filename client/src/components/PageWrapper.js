import React, { Component } from 'react';
import WrapperTitle from './WrapperTitle';
import { Droppable } from "react-drag-and-drop";
import $ from "jquery";
import '../css/PageWrapper.css';
import ButtonM from "./ButtonM"
import LabelM from "./LabelM"

const pageComponents = {
	"buttonM": ButtonM,
	"labelM": LabelM
};

class PageWrapper extends Component {

	constructor(props) {
		super(props);
		this.state = { "curState": 0 }
		this.page_content = [];
		this.inital_page_content = [];
		let index = 0;
		for (let row = 1; row <= 12; row++) {
			for (let cell = 1; cell <= 12; cell++) {
				let currentCell = { "index": index, "row": row, "cell": cell, "cellWidth": "1", "cellHeight": "50px", "cell_content": "", "cell_content_style": {} };
				this.page_content.push(currentCell);
				index++;
			}
		}

		this.inital_page_content = this.page_content;
		this.elementStyle = {};
	}


	dropNotification(item, that, data) {
		// console.log(data);
		// console.log(item);
		// console.log(that);
		// console.log(that.state.page_content);
		that.setState({ "curState": (that.state.curState + 1) });
		that.page_content[item.index]["cell_content"] = data.component;
		that.props.componentClicked({ "id": (data.component + item.index), "type": data.component });
		// that.forceUpdate();
		// console.log(that.props)
	}

	handleComponentClick(e) {
		let curElementIndex = e.target.id.replace(/^\D+/g, '');
		$(".grid_cell_selected").removeClass("grid_cell_selected");
		$("#cell_" + curElementIndex).addClass("grid_cell_selected");
		console.log($("#cell_" + curElementIndex));
		let curStyle = this.page_content[curElementIndex]["cell_content_style"];
		this.props.componentClicked({ "id": (e.target.id), "type": (e.target.id.replace(/[0-9]/g, '')), "style": curStyle });
	}

	viewToggle(e) {
		if ($(e.target).text() === "full-screen") {
			$(".grid_cell_selected").removeClass("grid_cell_selected");
			$(".PageWrapper .grid_cell_item").removeClass("grid_cell");
			$(e.target).text("normal-screen");
			$(".PageWrapper").removeClass("col-sm-6");
			$(".PageWrapper").addClass("col-sm-12");
			$(".RigthWrapper").hide("slow");
			$(".LeftWrapper").hide("slow");
			$(".logOut").hide();
		}
		else if ($(e.target).text() === "normal-screen") {
			$(e.target).text("full-screen");
			$(".PageWrapper .grid_cell_item").addClass("grid_cell");
			$(".PageWrapper").removeClass("col-sm-12");
			$(".PageWrapper").addClass("col-sm-6");
			$(".RigthWrapper").show("slow");
			$(".LeftWrapper").show("slow");
			$(".logOut").show();

		}
	}

	savePage(e) {
		e.preventDefault();
		console.log(this.page_content)
		// if page is selected
		if (this.props.selectedPage) {
			console.log(localStorage);
			$.post("http://localhost:9000/api/admin/save_page_structure", { "pageName": this.props.selectedPage, "pageStructure": this.page_content, "name": localStorage.getItem("admin_name"), "token": localStorage.getItem("admin_token") }, function (data) {
				alert("Your page is " + data.resp);
			}, "json")
				.fail(function (response) {
					alert("Error" + response.responseText);
				});
		}
	}

	render() {
		// console.log("state refresh")
		// console.log(this.state);
		// console.log("page props", this.props);
		console.log("el styl e", this.elementStyle[this.props.elementId]);
		console.log(this.props.page_content)
		if (this.props.page_content) {
			this.page_content = this.props.page_content.length ? this.props.page_content : this.inital_page_content;
			this.elementStyle = this.props.page_content.map((component) => component["cell_content_style"] || {});
			this.props.pageContentUpdated();
		}
		if (this.props.elementId) {
			let curElementIndex = this.props.elementId.replace(/^\D+/g, '')
			//empty given cell
			if (this.props.operation == "remove") {
				this.page_content[curElementIndex]["cellHeight"] = "50px";
				this.page_content[curElementIndex]["cellWidth"] = "1";
				this.page_content[curElementIndex]["cell_content"] = "";
				this.page_content[curElementIndex]["cell_content_style"] = {};
				this.props.elementRemovedFinished();
			}
			else {
				console.log("page content ", this.page_content);
				this.elementStyle[curElementIndex] = this.elementStyle[curElementIndex] || {};
				this.elementStyle[curElementIndex][this.props.propertyName] = this.props.propertyVal;
				this.page_content[curElementIndex]["cell_content_style"] = this.page_content[curElementIndex]["cell_content_style"] || {};
				this.page_content[curElementIndex]["cell_content_style"][this.props.propertyName] = this.props.propertyVal;
				this.page_content[curElementIndex]["cellWidth"] = this.page_content[curElementIndex]["cell_content_style"]["cellWidth"] || "1";
				this.page_content[curElementIndex]["cellHeight"] = this.page_content[curElementIndex]["cell_content_style"]["cellHeight"] || "50px";
				console.log("page ele style", this.page_content);
			}


		}

		let TempElement;

		if (this.props.clientMode) {
			return (
				<div className="PageWrapper col-sm-12">
					<div className="row">
						<br />
						{this.page_content.map((cell, index) =>
						
								<div id={"cell_" + index} key={index} className={" " + "col-xs-" + cell.cellWidth + " "} style={{ height: cell.cellHeight }}>
									{/*{index}*/}
									{cell["cell_content"] && (TempElement = pageComponents[cell["cell_content"]]) ? <TempElement
										elStyle={this.props.elementId == (cell["cell_content"] + index) ? this.elementStyle[index] : this.elementStyle[index]}
										elementId={cell["cell_content"] + index}  elementText="Mern" /> : ""}
								</div>

						)}
					</div>
				</div>
			);
		}
		return (
			<div className="PageWrapper col-sm-6">
				<div className="row">
					<WrapperTitle name={this.props.selectedPage ? (this.props.selectedPage + " page view") : "page view"} />
					<div className="row ">
						<div className="col-xs-12 text-right">
							<button className="savenBtn btn btn-default" onClick={(e) => this.savePage(e)}>save</button>
							<button className="screenBtn btn btn-primary" onClick={(e) => this.viewToggle(e)}>full-screen</button>
						</div>
					</div>
					<br />
					{this.page_content.map((cell, index) =>
						<Droppable key={index} types={["component"]}
							onDrop={this.dropNotification.bind(this, cell, this)}
							onDragEnter={this.dragEnter}>
							<div id={"cell_" + index} className={"grid_cell grid_cell_item " + "col-xs-" + cell.cellWidth + " "} style={{ height: cell.cellHeight }}>
								{/*{index}*/}
								{cell["cell_content"] && (TempElement = pageComponents[cell["cell_content"]]) ? <TempElement
									elStyle={this.props.elementId == (cell["cell_content"] + index) ? this.elementStyle[index] : this.elementStyle[index]}
									elementId={cell["cell_content"] + index} elementClick={(e) => this.handleComponentClick(e)} elementText="Mern" /> : ""}
							</div>
						</Droppable>
					)}
				</div>
			</div>
		);
	}
}

export default PageWrapper;