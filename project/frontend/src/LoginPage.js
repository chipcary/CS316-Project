import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import {loginUser} from './action';


class LoginPage extends React.Component {
	constructor() {
		super();
		this.state = {
			email : "",
			password: "",
			errors: {}
		};

	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/userSearch")
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.auth.isAuthenticated){
			this.props.history.push("/userSearch");
		}
	}


	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	}

	async onSubmit(e) {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password,
		}
		this.loginUser(userData);
	}



	setCurrentUser = (decoded) => {
		return {
			payload: decoded,
		};
	}

	render() {
		const { errors } = this.state;
		return (
		<div className="container">
	        <div style={{ marginTop: "4rem" }} className="row">
	          <div className="col s8 offset-s2">
	            <Link to="/" className="btn-flat waves-effect">
	              <i className="material-icons left">keyboard_backspace</i> Back to
	              home
	            </Link>
	            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
	              <h4>
	                <b>Login</b> below
	              </h4>
	              <p className="grey-text text-darken-1">
	                Don't have an account? Click here to register!
	              </p>
	            </div>
	            <form noValidate onSubmit={this.onSubmit}>
	              <div className="input-field col s12">
	                <input
	                  onChange={this.onChange}
	                  value={this.state.email}
	                  error={errors.email}
	                  id="email"
	                  type="text"
	                />
	                <label htmlFor="email">Email</label>
	                <span className="red-text">
	                  {errors.email}
	                  {errors.emailnotfound}
	                </span>
	              </div>
	              <div className="input-field col s12">
	                <input
	                  onChange={this.onChange}
	                  value={this.state.password}
	                  error={errors.password}
	                  id="password"
	                  type="password"
	                />
	                <label htmlFor="password">Password</label>
	                <span className="red-text">
	                  {errors.password}
	                  {errors.passwordincorrect}
	                </span>
	              </div>
	              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
	                <button
	                  style={{
	                    width: "150px",
	                    borderRadius: "3px",
	                    letterSpacing: "1.5px",
	                    marginTop: "1rem",
	                    backgroundColor: "rgb(0, 188, 212)"
	                  }}
	                  type="submit"
	                  className="hoverable"
	                >
	                  Login
	                </button>
	              </div>
	            </form>
	          </div>
	        </div>
	      </div>
	    );
	}
}

LoginPage.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  {loginUser}
)(LoginPage);

