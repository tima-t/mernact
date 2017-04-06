import React, { Component } from 'react';
import WrapperTitle from './WrapperTitle';

class PageWrapper extends Component {
	render() {
		return (
			<div className="PageWrapper col-sm-6">
				<WrapperTitle name="Page View"/>
			</div>
		);
	}
}

export default PageWrapper;