import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {logoutUser} from "./action";
import PropTypes from "prop-types"
import {Button} from 'reactstrap';
import FlatButton from 'material-ui/FlatButton';
import Person from 'material-ui/svg-icons/social/person-outline';

import { Provider } from "react-redux";

class Logout extends Component {
  onLogoutClick = e => {
    // console.log("this is in the onLogoutClcik");
    e.preventDefault();
    this.props.logoutUser();
    window.location.href="./";
  };

render() {
    const email = this.props.auth.user.email;
    console.log(email)
	return (
         <FlatButton
            label={`Log out`}
            labelPosition="after"
            primary={true}
            cursor
            icon={<Person />}
            onClick = {this.onLogoutClick}
            />

    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(
  mapStateToProps,
  { logoutUser }
)(Logout);
