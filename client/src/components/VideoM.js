import React, { Component } from 'react';
import "../css/VideoM.css"

class YoutubeVideoM extends Component {

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
		console.log("here");
		// console.log("this element ", this.props.elStyle);
		this.style = this.props.elStyle || this.style;
		if (this.style) {
			//color: this.props.elStyle.color || '' , width: "100%"
			return (
				<div id={this.props.elementId} className="row" onClick={(e) => this.handleClick(e)} >
					<iframe style={this.style} className={"video video-default YoutubeVideoM " + this.style.class} width="80%" height="40px"
						src={this.style.src || "https://www.youtube.com/embed/y8SUbCP-4QI"}>
					</iframe>
				</div>
			)
		}
		return (
			<div id={this.props.elementId} className="row" onClick={(e) => this.handleClick(e)}  >
				<iframe className={"video video-default YoutubeVideoM "} width="80%" height="40px"
					src={"https://www.youtube.com/embed/y8SUbCP-4QI"}>
				</iframe>
			</div>
		)
	}
}

export default YoutubeVideoM;