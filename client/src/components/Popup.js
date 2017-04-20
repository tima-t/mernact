import React, { Component } from 'react';
import WidgetProp from './WidgetProp';
import $ from 'jquery';


class Popup extends Component {

	handleSuccess(e) {
		console.log(this.props.page);
		let paramName = $(`#${this.props.id} .modal-body .WidgetProp input`).val();
		this.props.successFunc(e, paramName);// || function(){};
	}

	render() {
		return (
			<div className="modal fade" id={this.props.id} role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">&times;</button>
							<h4 className="modal-title">Modal Header</h4>
						</div>
						<div className="modal-body">
							<p>Some text in the modal.</p>
							<WidgetProp key={this.props.id} widgetVal={this.props.page || ""} name="Page Title" />
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => this.handleSuccess(e)}>OK</button>
						</div>
					</div>

				</div>
			</div>
		)
	}
};


export default Popup;
