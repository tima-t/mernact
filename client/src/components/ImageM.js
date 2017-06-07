import React, { Component } from 'react';
import "../css/ImageM.css"

class ImageM extends Component {

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
		// console.log("this element ", this.props.elStyle);
		this.style = this.props.elStyle || this.style;
		if (this.style) {
			//color: this.props.elStyle.color || '' , width: "100%"
			return (
				<div className="row">
					<img alt="" id={this.props.elementId} src={this.style.src || "./imgDefault.png"} onClick={(e) => this.handleClick(e)} width="50px" height="50px"  style={this.style} className={"image image-default imageM " + this.style.class}/>
				</div>
			)
		}
		return (
			<div className="row">
				<img alt="" id={this.props.elementId} onClick={(e) => this.handleClick(e)} style={{ width: "50px", height:"50px" }} src={"./imgDefault.png"} className={"image image-default imageM "} />
			</div>
		)
	}
}

export default ImageM;