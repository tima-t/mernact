import React, { Component } from 'react';
import '../css/ListView.css';

class ListView extends Component {

	handleListClicked(e){
		this.props.listClicked(e);
	}
	
	render() {
		return (
			<ul className="list-group">
				{this.props.names.map((name, index) =>
					<li className="list-group-item" key={index} onClick={(e) => this.handleListClicked(e)} ><a>{name}</a></li>
				)}
			</ul>
		)
	}
}

export default ListView;