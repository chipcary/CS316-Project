import React from 'react';
import PropTypes from 'prop-types';
import PageTable from './PageTable';
import * as Constants from './Constants';
import GeneralNavBar from './GeneralNavBar';
import {Button} from 'reactstrap';
import './CenteredListingPage.css';
import AuthRoleValidation from './AuthRoleValidation';

export default class UserSettingsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			user: null,
			projects_created: [],
			projects_joined: [],
			state: "",
			city: "",
			interest1: "",
			interest2: "",
			interest3: "",
		}

		this.loadDataFromServer = this.loadDataFromServer.bind(this);
	}

	async loadDataFromServer(){
		var email = await AuthRoleValidation.determineUser();
		console.log(email);
		var path = '/api/users/' + email[0].email;
		var user = await fetch(path, {method: 'GET'})
			.then((res) => {
				console.log(res)
				var interest1 = "";
				var interest2 = "";
				var interest3 = ""
				if(res[0].UserInterest != null && res[0].UserInterest.interest1 != null){
					interest1 = res[0].UserInterest.interest1;
				}
				if(res[0].UserInterest != null && res[0].UserInterest.interest2 != null){
					interest2 = res[0].UserInterest.interest2;
				}
				if(res[0].UserInterest != null && res[0].UserInterest.interest3 != null){
					interest3 = res[0].UserInterest.interest3;
				}
				this.setState({
					email: res[0].email,
					name: res[0].name,
					password: res[0].password,
					user: res[0],
					state: res[0].state,
					city: res[0].city,
					interest1: interest1,
					interest2: interest2,
					interest3: interest3,
				});
			});
	}

	async componentDidMount(){
		await this.loadDataFromServer();
	}

	async componentDidUpdate(prevProps, prevState){
		// this.loadDataFro
	}

	async onSubmit(){
		if(this.state.city.length < 1 || this.state.state.length < 1 || this.state.interest1.length < 1 ||
			this.state.interest2.length < 1 || this.state.interest3.length < 1){
			alert('Please include both a city and state');
			return;
		}
		const userData = {
			email: this.state.email,
			name: this.state.name,
			password: this.state.password,
			city: this.state.city,
			state: this.state.state,
			interest1: this.state.interest1,
			interest2: this.state.interest2,
			interest3: this.state.interest3,
		}
		alert('gets here');
		//this.props.updateUser(userData);
	};

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	render() {
		return (
			<div>
				<GeneralNavBar title={this.state.user != null ? this.state.user.name + "'s Page" : ""}> </GeneralNavBar>

				<div className="paddedDiv">
					Name: 
					{this.state.user != null ? " " + this.state.user.name : ""}
				</div>

				<div className="paddedDiv">
					Email: 
					{this.state.user != null ? " " + this.state.user.email : ""}
				</div>

				<form noValidate onSubmit={this.onSubmit}>

	              <div className="input-field col s12">
	                <input
	                  onChange={this.onChange}
	                  value={this.state.city}
	                  id="city"
	                  type="text"
	                />
	                <label htmlFor="city">Name</label>

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
	                <select id="interest1" size="5" onChange={this.onChange} value={this.state.interest1}>
	                	<option value="Human Rights">Human Rights</option>
	                	<option value="Animal Rights">Animal Rights</option>
	                	<option value="Arts and Crafts">Arts and Crafts</option>
	                	<option value="Youth">Youth</option>
	                	<option value="Technology">Technology</option>
	                	<option value="Politics">Politics</option>
	                	<option value="Education">Education</option>
	                	<option value="Health">Health</option>
	                	<option value="Seniors">Seniors</option>
	                	<option value="Disaster Relief">Disaster Relief</option>
	                	<option value="Environment">Environment</option>
	                	<option value="Women">Women</option>
	                	<option value="Faith-based">Faith-based</option>
	                	<option value="International">International</option>
	                	<option value="LGBT">LGBT</option>
	                	<option value="Sports">Sports</option>
	                </select>
	                <label htmlFor="interest1">Interest 1</label>
	              </div>

	              <div className="input-field col s12">
	                <select id="interest2" size="5" onChange={this.onChange} value={this.state.interest2}>
	                	<option value="Human Rights">Alabama</option>
	                	<option value="Animal Rights">Alaska</option>
	                	<option value="Arts and Crafts">Arizona</option>
	                	<option value="Youth">Arkansas</option>
	                	<option value="Technology">California</option>
	                	<option value="Politics">Colorado</option>
	                	<option value="Education">Connecticut</option>
	                	<option value="Health">Delaware</option>
	                	<option value="Seniors">Florida</option>
	                	<option value="Disaster Relief">Georgia</option>
	                	<option value="Environment">Hawaii</option>
	                	<option value="Women">Connecticut</option>
	                	<option value="Faith-based">Delaware</option>
	                	<option value="International">Florida</option>
	                	<option value="LGBT">Georgia</option>
	                	<option value="Sports">Hawaii</option>
	                </select>
	                <label htmlFor="interest2">Interest 2</label>
	              </div>

	              <div className="input-field col s12">
	                <select id="interest3" size="5" onChange={this.onChange} value={this.state.interest3}>
	                	<option value="Human Rights">Alabama</option>
	                	<option value="Animal Rights">Alaska</option>
	                	<option value="Arts and Crafts">Arizona</option>
	                	<option value="Youth">Arkansas</option>
	                	<option value="Technology">California</option>
	                	<option value="Politics">Colorado</option>
	                	<option value="Education">Connecticut</option>
	                	<option value="Health">Delaware</option>
	                	<option value="Seniors">Florida</option>
	                	<option value="Disaster Relief">Georgia</option>
	                	<option value="Environment">Hawaii</option>
	                	<option value="Women">Connecticut</option>
	                	<option value="Faith-based">Delaware</option>
	                	<option value="International">Florida</option>
	                	<option value="LGBT">Georgia</option>
	                	<option value="Sports">Hawaii</option>
	                </select>
	                <label htmlFor="interest3">Interest 3</label>
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
	                  Update User Information
	                </button>
	              </div>
	            </form>

			</div>
			)
	}
}