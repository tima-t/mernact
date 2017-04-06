import React, { Component } from 'react';
import WrapperTitle from './WrapperTitle';
import WidgetProp from './WidgetProp';

class RigthWrapper extends Component {
	render() {
		return (
			<div style={{ backgroundColor: '#D5D8D5' }} className="RigthWrapper col-sm-3">
				<WrapperTitle name="Widget properties" />
				<form>
					<WidgetProp name='id'/>
					<WidgetProp name='color'/>
					<WidgetProp name='font-size'/>
					<WidgetProp name='id'/>
					<WidgetProp name='color'/>
					<WidgetProp name='font-size'/>

				</form>
			</div>
		);
	}
}

export default RigthWrapper;