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
		if (!that.props.component) {
			return ;
		}
		else{
			if(that.componentSelected[0] !== that.props.componentId ){
				that.componentProps.pop();
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


	render() {
		this.componentDidMountRec();
		if(this.componentProps.length){
			let ComponentPropsView =
				<div style={{ backgroundColor: '#D5D8D5' }} className="RigthWrapper col-sm-3">
					<WrapperTitle name="Widget properties" />
					<form>
						{this.componentProps.map((property, index) =>
						<WidgetProp  key={index} name={property} />
						)}
					</form>
				</div>;

		return ComponentPropsView;
		}
	
		return (
			<div style={{ backgroundColor: '#D5D8D5' }} className="RigthWrapper col-sm-3">
			<WrapperTitle name="Widget properties" />
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