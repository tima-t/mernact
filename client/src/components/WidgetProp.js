import React, { Component } from 'react';

class WidgetProps extends Component {

	render() {
			 let input = this.props.widgetVal? <input type="text" className="form-control" placeholder={this.props.name} value={this.props.widgetVal} /> : 
			<input type="text" className="form-control" defaultValue="" placeholder={this.props.placeholder || this.props.name} onChange={e=> this.handlePropertyChanged(e, this.props.elementId)} /*onChange={e => this.onWidgetChange(e.target.value)}*/ /> ;
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

	handlePropertyChanged(e,elementId){
		if( typeof this.props.propertyChanged === "function"){
			let propName = this.props.name;
			this.props.propertyChanged({e, elementId, propName});
		}
		else{
			console.log("no function is triggered on change");
		}



	}
}

export default WidgetProps;