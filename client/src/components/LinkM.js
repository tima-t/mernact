import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';

class LinkM extends Component {

	constructor(props) {
		super(props);
		this.style = "";
	}

	handleClick(e) {
		if(this.style.destination && this.style.destination.indexOf(".") !== -1 && this.props.clientMode){
			window.location.assign(this.style.destination);
		}
		if (this.props.elementClick) {
			this.props.elementClick(e);
		}

	}
	render() {
		console.log("this element ", this.props.elStyle);
		this.style = this.props.elStyle || this.style;
		if (this.style) {
			//color: this.props.elStyle.color || '' , width: "100%"
			return (
				<div className="row">
					<Link to={this.props.clientMode && this.style.destination && this.style.destination.indexOf(".") === -1  ? "/page/" + this.style.destination : "#"} id={this.props.elementId} onClick={(e) => this.handleClick(e)} style={this.style} className={"btn btn-info " + this.style.class}>{this.style.value || this.props.elementText}</Link>
				</div>
			)

		}

		return (
			<div className="row">
				<Link to="#" id={this.props.elementId} onClick={(e) => this.handleClick(e)} style={{ width: "100%" }} className="btn btn-info">{"Link" || "val"}</Link>
			</div>
		)
	}
}

export default LinkM;