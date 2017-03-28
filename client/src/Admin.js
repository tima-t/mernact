import React, { Component } from 'react';
import './css/Admin.css';
import LeftWrapper from './componnets/LeftWrapper';
import PageWrapper from './componnets/PageWrapper';
import RigthWrapper from './componnets/RigthWrapper';
import {
	Link
} from 'react-router-dom';

class Admin extends Component {
	render() {
		return (
			<div className="AdminPanel">
				<LeftWrapper/>
				<PageWrapper/>
				<RigthWrapper/>
				<Link to="/">Log Out</Link>
			</div>
		);
	}
}

export default Admin;
