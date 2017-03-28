import React, { Component } from 'react';

class WrapperTitle extends Component {
	render() {
		return (
			<div className="WrapperTitle row text-center">
				<h1>This is {this.props.name}	</h1>
			</div>
		);
	}
}

export default WrapperTitle;