import React, { Component } from 'react';

class TabsMenu extends Component {
	handleTabChange(e){
		let menuOption = e.target.getAttribute('data-name');
		this.props.tabClick(e, menuOption);
	}

	render() {
		return (
			<ul className="nav nav-tabs">
				{this.props.names.map((name, index) =>
					<li className={name === this.props.selected ? "active" : ""} key={index} ><a data-name={name} style={{cursor :'pointer'}} onClick={(e)=> this.handleTabChange(e)}  >{name} </a></li>
				)}
			</ul>
		)
	}
}

export default TabsMenu;