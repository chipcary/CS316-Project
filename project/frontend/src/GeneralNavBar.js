import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand} from 'reactstrap';
import GeneralMenu from './GeneralMenu'
import * as Constants from './Constants';
import './CenteredListingPage.css';
import Logout from './Logout';



export default class GeneralNavBar extends React.Component { 
	constructor(props){
		super(props);
		this.state = {
			isOpen: true,
		};
	}

	toggle() { 
		this.setState({
			isOpen: !this.state.isOpen
		});
	}


	render() {
		return (
			<div>
				<Navbar id="bar" color="light" light expand="md">
				  <div id='menu-title'>
				    <GeneralMenu></GeneralMenu>
				    <div></div>
				  </div>
				  <div className="paddedDiv">
				  <NavbarBrand href="/">{this.props.title}</NavbarBrand>
				  </div>
				  <Logout id="usermenu"/>
				</Navbar>
			</div>
		);
	}
}