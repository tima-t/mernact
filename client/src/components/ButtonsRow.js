import React, { Component } from 'react';

class ButtonsRow extends Component {

	handleClick(e){
		let action = e.target.getAttribute('data-action');
		this.props.buttonClick(e, action);
	}
	render() {
		return (
			<div className="row">
				{this.props.buttons.map((button, index) =>
					<div key={index} className={'col-xs-' + button.width}>
						<button data-action={button.action} data-toggle={"" || button.dataToggle} data-target={'' || button.dataTarget} onClick={(e) => this.handleClick(e)} style={{width:'100%'}} className={'btn ' + button.type}> {button.text}</button>
					</div>
				)}
			</div>
		)
	}
}

export default ButtonsRow;