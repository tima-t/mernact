import React, { Component } from 'react';

class ButtonM extends Component {

	handleClick(e){
		let action = e.target.getAttribute('data-action');
		this.props.buttonClick(e, action);
	}
	render() {
		return (
			<div className="row">
				<button style={{width:"100%"}} className="btn btn-success">{this.props.btnText || "some text"}</button>
			</div>
		)
	}
}

export default ButtonM;