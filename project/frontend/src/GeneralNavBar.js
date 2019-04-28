import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand} from 'reactstrap';
import GeneralMenu from './GeneralMenu'
import * as Constants from './Constants';


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
				    <div>{this.props.title}</div>
				  </div>
				  <NavbarBrand href="/">{Constants.TITLE}</NavbarBrand>
				</Navbar>
			</div>
		);
	}
}