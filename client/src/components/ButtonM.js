import React, { Component } from 'react';

class ButtonM extends Component {

	handleClick(e){
		console.log(e.target.id);
		this.props.btnClick(e);
		
	}
	render() {
		console.log("element stye ",this.props);
		return (
			<div className="row">
				<button onClick={(e)=>this.handleClick(e)} id={this.props.btnId} style={{width:"100%"}} className="btn btn-success">{this.props.btnText || "some text"}</button>
			</div>
		)
	}
}

export default ButtonM;