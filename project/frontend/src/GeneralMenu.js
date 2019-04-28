import React from 'react';
import {Link} from "react-router-dom";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import * as Constants from './Constants';

export default class GeneralMenu extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			open: false,
		}
	}

	toggle = () => this.setState({ open: !this.state.open})
	close = () => this.setState({ open: false});

	render() {
		return (
		  <div>
		    <div onClick={this.toggle} className = "waves-effect waves-light button hoverable" primary={true}>
		      <MenuIcon color = '#424242'></MenuIcon>
		  	</div>

		    <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
		      <Link to='/'>
		        <MenuItem onClick={this.close} style = {{color: 'rgb(0,188,212)'}}className = "item" primaryText={'Search for Users'}></MenuItem>
			  </Link>
			  <Link to='/projectSearch'>
			  	<MenuItem onClick={this.close} style = {{color: 'rgb(0,188,212)'}}className = "item" primaryText={'Search for Projects'}></MenuItem>
		      </Link>
		    </Drawer>

		  </div>
		)
	}
}