import React, { Component } from 'react';
import '../css/ListView.css';
import {Draggable} from "react-drag-and-drop";

class ListView extends Component {

	handleListClicked(e){
		this.props.listClicked(e);
	}

	componentDidMount(){
	}
	
	render() {
		return (
			<ul className="list-group">
				{this.props.names.map((name, index) =>
					<Draggable key={index} data={name + "M"} type="component"><li className="list-group-item" key={index} onClick={(e) => this.handleListClicked(e)} ><a>{name}</a></li></Draggable>
				)}
			</ul>
		)
	}
}

export default ListView;