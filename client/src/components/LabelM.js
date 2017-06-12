import React, { Component } from 'react';
import "../css/LabelM.css"

class LabelM extends Component {

	constructor(props) {
		super(props);
		this.style = "";
	}

	handleClick(e) {
		if (this.props.elementClick) {
			this.props.elementClick(e);
		}

	}
	render() {
		this.style = this.props.elStyle || this.style;
		if (this.style) {
			return (
				<div className="row">
					<span id={this.props.elementId} onClick={(e) => this.handleClick(e)} style={this.style} className={"label label-default labelM " + this.style.class}>{this.style.value || this.props.elementText}</span>
				</div>
			)
		}
		return (
			<div className="row">
				<span id={this.props.elementId} onClick={(e) => this.handleClick(e)} style={{ width: "100%" }} className="label label-default labelM ">{this.props.elementText || "val"}</span>
			</div>
		)
	}
}

export default LabelM;