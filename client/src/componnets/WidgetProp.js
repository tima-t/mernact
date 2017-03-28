import React, { Component } from 'react';

class WidgetProps extends Component {

	render() {
			 let input = this.props.widgetVal? <input type="text" className="form-control" placeholder={this.props.name} value={this.props.widgetVal} /> : 
			<input type="text" className="form-control" placeholder={this.props.name} /*onChange={e => this.onWidgetChange(e.target.value)}*/ /> ;
		return (
			<div className="form-group WidgetProp">
				<label htmlFor="usr">{this.props.name}</label>
				{input}
			</div>
		);
	}
	// onWidgetChange(value) {
	// 	this.setState({
	// 		val: value
	// 	});
	// }
}

export default WidgetProps;