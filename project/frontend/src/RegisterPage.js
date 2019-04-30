import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {registerUser, associatePassword} from './action';


class RegisterPage extends Component {
	constructor() {
		super();
		this.state = {
			email : "",
			name: "",
			password: "",
			city: "",
			state: "AL",
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			console.log(this.props.auth);
			this.props.history.push("/userSearch")
		}
	}

	componentWillReceiveProps(nextProps){
		console.log('YOOO');
		if(nextProps.auth.isAuthenticated){
			this.props.history.push("/userSearch");
		}
	}


	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();
		if(this.state.email.length < 1 || this.state.name.length < 1 || this.state.password.length < 1 || this.state.city.length < 1){
			alert('Please fill out all fields');
			return;
		}
		const userData = {
			email: this.state.email,
			name: this.state.name,
			password: this.state.password,
			city: this.state.city,
			state: this.state.state,
		}
		this.props.registerUser(userData);
	};

	render() {
		return (
		<div className="container">
	        <div style={{ marginTop: "4rem" }} className="row">
	          <div className="col s8 offset-s2">

	            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
	            <Link to="/login" className="btn-flat waves-effect">
	              <p className="grey-text text-darken-1">
	                Already have an account? Click here to login!
	              </p>
	            </Link>
	              <h4>
	                <b>Register</b> below
	              </h4>
	            </div>
	            <form noValidate onSubmit={this.onSubmit}>

	              <div className="input-field col s12">
	                <input
	                  onChange={this.onChange}
	                  value={this.state.name}
	                  id="name"
	                  type="text"
	                />
	                <label htmlFor="name">Name</label>

	              </div>

	              <div className="input-field col s12">
	                <input
	                  onChange={this.onChange}
	                  value={this.state.email}
	                  id="email"
	                  type="text"
	                />
	                <label htmlFor="email">Email</label>

	              </div>

	              <div className="input-field col s12">
	                <select id="state" size="5" onChange={this.onChange} value={this.state.state}>
	                	<option value="AL">Alabama</option>
	                	<option value="AK">Alaska</option>
	                	<option value="AZ">Arizona</option>
	                	<option value="AR">Arkansas</option>
	                	<option value="CA">California</option>
	                	<option value="CO">Colorado</option>
	                	<option value="CT">Connecticut</option>
	                	<option value="DE">Delaware</option>
	                	<option value="FL">Florida</option>
	                	<option value="GA">Georgia</option>
	                	<option value="HI">Hawaii</option>
	                	<option value="ID">Idaho</option>
	                	<option value="IL">Illinois</option>
	                	<option value="IN">Indiana</option>
	                	<option value="IA">Iowa</option>
	                	<option value="KS">Kansas</option>
	                	<option value="KY">Kentucky</option>
	                	<option value="LA">Louisiana</option>
	                	<option value="ME">Maine</option>
	                	<option value="MD">Maryland</option>
	                	<option value="MA">Massachusetts</option>
	                	<option value="MI">Michigan</option>
	                	<option value="MN">Minnesota</option>
	                	<option value="MS">Mississippi</option>
	                	<option value="MO">Missouri</option>
	                	<option value="MT">Montana</option>
	                	<option value="NE">Nebraska</option>
	                	<option value="NV">Nevada</option>
	                	<option value="NH">New Hampshire</option>
	                	<option value="NJ">New Jersey</option>
	                	<option value="NM">New Mexico</option>
	                	<option value="NY">New York</option>
	                	<option value="NC">North Carolina</option>
	                	<option value="ND">North Dakota</option>
	                	<option value="OH">Ohio</option>
	                	<option value="OK">Oklahoma</option>
	                	<option value="OR">Oregon</option>
	                	<option value="PA">Pennsylvania</option>
	                	<option value="RI">Rhode Island</option>
	                	<option value="SC">South Carolina</option>
	                	<option value="SD">South Dakota</option>
	                	<option value="TN">Tennessee</option>
	                	<option value="TX">Texas</option>
	                	<option value="UT">Utah</option>
	                	<option value="VT">Vermont</option>
	                	<option value="VA">Virginia</option>
	                	<option value="WA">Washington</option>
	                	<option value="WV">West Virginia</option>
	                	<option value="WI">Wisconsin</option>
	                	<option value="WY">Wyoming</option>
	                </select>

	                <label htmlFor="state">State</label>
	              </div>

	              <div className="input-field col s12">
	                <input
	                  onChange={this.onChange}
	                  value={this.state.city}
	                  id="city"
	                  type="text"
	                />
	                <label htmlFor="city">City</label>
	              </div>

	              <div className="input-field col s12">
	                <input
	                  onChange={this.onChange}
	                  value={this.state.password}
	                  id="password"
	                  type="password"
	                />
	                <label htmlFor="password">Password</label>

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
	                  Register
	                </button>
	              </div>
	            </form>
	          </div>
	        </div>
	      </div>
	    );
	}
}


const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(
  mapStateToProps,
  { registerUser },
)(RegisterPage);

