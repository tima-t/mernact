import React, { Component } from 'react';

class ButtonM extends Component {

	constructor(props){
		super(props);
		this.style ="";
	}

	handleClick(e){
		if(this.props.elementClick){
			this.props.elementClick(e);
		}
		
	}
	render() {
		this.style = this.props.elStyle || this.style;
		if(this.style){
			return (
				<div className="row">
					<button id={this.props.elementId}  onClick={(e)=>this.handleClick(e)} style={this.style}   className={"btn btn-default " + this.style.class }>{this.style.value || this.props.elementText}</button>
				</div>
			)
		}
		return (
			<div className="row">
				<button id={this.props.elementId}  onClick={(e)=>this.handleClick(e)}  style={{width:"100%"}} className="btn btn-default">{this.props.elementText || "val"}</button>
			</div>
		)
	}
}

export default ButtonM;