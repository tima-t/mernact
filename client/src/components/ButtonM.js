import React, { Component } from 'react';

class ButtonM extends Component {

	constructor(props){
		super(props);
		this.style ="";
	}

	handleClick(e){
		console.log(e.target.id);
		this.props.btnClick(e);
		
	}
	render() {
		console.log("this element ", this.props.elStyle);
		this.style = this.props.elStyle || this.style;
		if(this.style){
			//color: this.props.elStyle.color || '' , width: "100%"
			return (
				<div className="row">
					<button style={this.style} onClick={(e)=>this.handleClick(e)} id={this.props.btnId} className={"btn btn-success " + this.style.class }>{this.style.value || this.props.btnText}</button>
				</div>
			)
		}
		return (
			<div className="row">
				<button onClick={(e)=>this.handleClick(e)} id={this.props.btnId} style={{width:"100%"}} className="btn btn-success">{this.props.btnText}</button>
			</div>
		)
	}
}

export default ButtonM;