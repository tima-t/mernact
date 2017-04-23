import React, { Component } from 'react';
import "../css/LabelM.css"

class LabelM extends Component {

	constructor(props) {
		super(props);
		this.style = "";
	}

	handleClick(e) {
		console.log(e.target.id);
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