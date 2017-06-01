import React, { Component } from 'react';
import "../css/ContactformM.css"

class ContactformM extends Component {

	constructor(props) {
		super(props);
		this.style = "";
	}

	handleClick(e) {
		console.log(e.target.id);
		if (this.props.elementClick) {
			this.props.elementClick(e);
		}

	}
	render() {
		// console.log("this element ", this.props.elStyle);
		this.style = this.props.elStyle || this.style;
		if (this.style) {
			//color: this.props.elStyle.color || '' , width: "100%"
			return (
				<div className="row contact" id={this.props.elementId} onClick={(e) => this.handleClick(e)}>
					<div className="row servHeading">
						Contact Us
					</div>
					<div className="row formT">
						<form>
							<div className="form-group col-xs-4 col-xs-offset-2 col-sm-offset-2">
								<input type="text" className="form-control" id="iName" placeholder="Name" />
								<input type="email" className="form-control" id="iEmail" placeholder="Email" />
								<input type="text" className="form-control" id="iSubject" placeholder="Subject" />
							</div>
							<div className="col-xs-4 ">
								<textarea id="iMessage" className="form-control" rows="5">
									Your message here
					</textarea>
							</div>
						</form>
					</div>

					<div className="row hButton">
						<button id="sendEmail" className="btn btn-warning tell_me">SEND MESSAGE <i className="fa fa-paper-plane" aria-hidden="true"></i></button>
					</div>

					<div className="alert alert-danger iErrors" role="alert">
						<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
						<span className="sr-only">Error:</span> Your name and email should be valid!
					</div>

					<div className="alert alert-success iSuccess" role="alert">
						<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Success: You successfully send your message;
					</div>
				</div>
			)
		}
		return (
			<div className="row contact" id={this.props.elementId} onClick={(e) => this.handleClick(e)} >
					<div className="row servHeading">
						Contact Us
					</div>
				<div className="row formT">
					<form>
						<div className="form-group col-xs-4 col-xs-offset-2 col-sm-offset-2">
							<input type="text" className="form-control" id="iName" placeholder="Name" />
							<input type="email" className="form-control" id="iEmail" placeholder="Email" />
							<input type="text" className="form-control" id="iSubject" placeholder="Subject" />
						</div>
						<div className="col-xs-4 ">
							<textarea id="iMessage" className="form-control" rows="5">
								Your message here
					</textarea>
						</div>
					</form>
				</div>

				<div className="row hButton">
					<button id="sendEmail" className="btn tell_me btn-warning">SEND MESSAGE <i className="fa fa-paper-plane" aria-hidden="true"></i></button>
				</div>

				<div className="alert alert-danger iErrors" role="alert">
					<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
					<span className="sr-only">Error:</span> Your name and email should be valid!
					</div>

				<div className="alert alert-success iSuccess" role="alert">
					<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Success: You successfully send your message;
					</div>
			</div>
		)
	}
}

export default ContactformM;