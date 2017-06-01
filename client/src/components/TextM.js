import React, { Component } from 'react';
class TextM extends Component {

	constructor(props) {
		super(props);
		this.style = "";
	}

	handleClick(e) {
		if (this.style.destination && this.style.destination.indexOf(".") !== -1 && this.props.clientMode) {
			window.location.assign(this.style.destination);
		}
		if (this.props.elementClick) {
			this.props.elementClick(e);
		}

	}
	render() {
		// console.log("this element ", this.props.elStyle);
		this.style = this.props.elStyle || this.style;
		if (this.style) {
			//color: this.props.elStyle.color || '' , width: "100%"
			return (
				<div className="row">
					<p id={this.props.elementId} onClick={(e) => this.handleClick(e)} style={this.style} className={"text textM " + this.style.class}>{this.style.value || this.props.elementText}</p>
				</div>
			)

		}

		return (
			<div className="row">
				<p id={this.props.elementId} onClick={(e) => this.handleClick(e)} style={{ width: "100%" }} className="text textM">{this.props.elementText || "val"}</p>
			</div>
		)
	}
}

export default TextM;

