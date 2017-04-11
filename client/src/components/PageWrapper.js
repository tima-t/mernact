import React, { Component } from 'react';
import WrapperTitle from './WrapperTitle';
import { Droppable } from "react-drag-and-drop";
import $ from "jquery";
import '../css/PageWrapper.css';
import ButtonM from "./ButtonM"

const pageComponents = {
	"buttonM": ButtonM
};

class PageWrapper extends Component {

	constructor(props) {
		super(props);
		this.state = { "page_content": [] }
		let index = 0;
		for (let row = 1; row <= 12; row++) {
			for (let cell = 1; cell <= 12; cell++) {
				let currentCell = { "index": index, "row": row, "cell": cell, "cell_content": "" };
				this.state.page_content.push(currentCell);
				index++;
			}
		}
	}


	dropNotification(item, that, data) {
		console.log(data);
		console.log(item);
		console.log(that);
		that.state.page_content[item.index]["cell_content"] = data.component;
		that.props.componentClicked({"id": (data.component +item.index) , "type": data.component});
		// that.forceUpdate();
		// console.log(that.props)
	}

	handleComponentClick(e){
		this.props.componentClicked({"id": (e.target.id) , "type": ''});
	}

	render() {
		console.log("state refresh")
		console.log(this.state)
		let TempElement;
		return (
			<div className="PageWrapper col-sm-6">
				<div className="row">
					<WrapperTitle name="Page View" />
					{this.state.page_content.map((cell, index) =>
						<Droppable key={index} types={["component"]}
							onDrop={this.dropNotification.bind(this, cell, this)}
							onDragEnter={this.dragEnter}>
							<div className="col-xs-1 grid_cell">
								{/*{index}*/}
								{cell["cell_content"] && (TempElement = pageComponents[cell["cell_content"]] )? <TempElement btnId={cell["cell_content"] + index} btnClick={(e) => this.handleComponentClick(e)} btnText="aaatch you"/> : ""  }
							</div>
						</Droppable>
					)}
				</div>
			</div>
		);
	}
}

export default PageWrapper;