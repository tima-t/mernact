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


	componentDidMountRec(){
		let that = this;
		console.log(" /////////////// did mount recursive");
		console.log(that.componentSelected);
		console.log(that.props.component);
		console.log(that.props.componentId);
		console.log("selected btn ",that.componentSelected[0])
		console.log("new com props ", that.props.componentId);

		console.log("///////////////////");
		if (!that.props.component) {
			return ;
		}
		else{
			if(that.componentSelected[0] !== that.props.componentId ){
				console.log("new el");
				console.log(that.componentSelected);
				that.componentSelected= [];
				that.componentProps.length = 0;
				console.log("after clean", that.componentSelected);
			} 
			if(that.componentSelected.length === 0){
				$.get("http://localhost:9000/api/admin/component_props", {
				"name": localStorage.getItem("admin_name"),
				"token": localStorage.getItem("admin_token"),
				"component": that.props.component.slice(0, -1)
			}, function (data) {
				data.resp.properties.map((prop, index)=>
					that.componentProps.push(prop)
				)
				that.componentSelected.push(that.props.componentId);
				that.setState({"updated": that.updated++})
			}, "json");
			}
		}

	

	}

	handlePropertyChanged(data){
		this.props.propertyChanged({"elementId" : data.elementId, "propertyName": data.propName , "propertyVal": data.e.target.value })
	}


	render() {
		this.componentDidMountRec();
		if(this.componentProps.length){
			let ComponentPropsView =
				<div style={{ backgroundColor: '#D5D8D5' }} className="RigthWrapper col-sm-3">
					<WrapperTitle name={"Edit " + this.props.componentId + " properties"} />
					<form>
						{this.componentProps.map((property, index) =>
						<WidgetProp elementId={this.props.componentId}  propertyChanged={(data) => this.handlePropertyChanged(data)}  key={index} name={property} placeholder={property == "id" ? this.props.componentId : ""} />
						)}
					</form>
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
				<WidgetProp name='id' />
				<WidgetProp name='color' />
				<WidgetProp name='font-size' />

			</form>
		</div>
		);
	}
}

export default RigthWrapper;