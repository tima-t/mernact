import React, { Component } from 'react';
import WrapperTitle from './WrapperTitle';
import WidgetProp from './WidgetProp';
import $ from "jquery";

class RigthWrapper extends Component {

	constructor(props) {
		super(props);
		this.componentProps = [];
		this.updateState = 0;
		this.componentSelected = [];
		this.componentDidMountRec = this.componentDidMountRec.bind(this);
	}


	componentDidMountRec() {
		let that = this;

		if (!that.props.component) {
			return;
		}
		else {
			if (that.componentSelected[0] !== that.props.componentId) {

				that.componentSelected = [];
				that.componentProps.length = 0;

			}
			if (that.componentSelected.length === 0) {
				$.get("http://localhost:9000/api/admin/component_props", {
					"name": localStorage.getItem("admin_name"),
					"token": localStorage.getItem("admin_token"),
					"component": that.props.component.slice(0, -1)
				}, function (data) {
					data.resp.properties.map((prop, index) =>
						that.componentProps.push(prop)
					)
					that.componentSelected.push(that.props.componentId);
					that.setState({ "updated": that.updated++ })
				}, "json");
			}
		}
	}

	handlePropertyChanged(data) {
		this.props.propertyChanged({ "elementId": data.elementId, "propertyName": data.propName, "propertyVal": data.e.target.value })
	}

	handleElementRemoved(data) {
		this.props.elementRemoved({ "elementId": this.props.componentId })
	}


	render() {
		this.componentDidMountRec();
		if (this.componentProps.length) {
			let ComponentPropsView =
				<div style={{ backgroundColor: '#D5D8D5' }} className="RigthWrapper col-sm-3">
					<WrapperTitle name={"Edit " + this.props.componentId + " properties"} />
					<form>
						{this.componentProps.map((property, index) =>
							<WidgetProp widgetVal={this.props.componentStyle && this.props.componentStyle[property]} elementId={this.props.componentId} propertyChanged={(data) => this.handlePropertyChanged(data)} key={index} name={property} placeholder={property === "id" ? this.props.componentId : ""} />
						)}
						<WidgetProp key={this.props.componentId + 1} widgetVal={this.props.componentStyle && this.props.componentStyle["cellHeight"]} elementId={this.props.componentId} propertyChanged={(data) => this.handlePropertyChanged(data)} name="cellHeight" placeholder={"50px"} />
						<WidgetProp key={this.props.componentId + 2} widgetVal={this.props.componentStyle && this.props.componentStyle["cellWidth"]} elementId={this.props.componentId} propertyChanged={(data) => this.handlePropertyChanged(data)} name="cellWidth" placeholder={"1 to 12"} />
					</form>
					<div className="row">
						<div className="col-xs-4">
							<button className="btn btn-primary" onClick={(data) => this.handleElementRemoved(data)}>Remove</button>
						</div>
					</div>
				</div>;

			return ComponentPropsView;
		}

		return (
			<div style={{ backgroundColor: '#D5D8D5' }} className="RigthWrapper col-sm-3">
				<WrapperTitle name="Select a widget" />
				<form>
					<WidgetProp name='id' />
					<WidgetProp name='color' />
					<WidgetProp name='font-size' />
					<WidgetProp name='height' />
					<WidgetProp name='width' />
					<WidgetProp name='class' />

				</form>
			</div>
		);
	}
}

export default RigthWrapper;