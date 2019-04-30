import React from 'react';
import GeneralNavBar from './GeneralNavBar';
import {Button} from 'reactstrap';
import {DateRange} from 'react-date-range';
import AuthRoleValidation from './AuthRoleValidation';

export default class newProjectPage extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			project_name: "",
			tag: "",
			start_date: "",
			end_date: "",
			curr_capacity: "1",
			goal_capacity: "",
			city: "",
			state: "",
		}
		this.handleSelect = this.handleSelect.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSelect(range){
		console.log(range);
		var start_date = "" + range.startDate.format("YYYY-MM-DD");
		var end_date = "" + range.endDate.format("YYYY-MM-DD")
		if(start_date != "" && end_date != "")
		this.setState({
			start_date: start_date,
			end_date: end_date,
		})
	}

	async handleSubmit(){
		var email = await AuthRoleValidation.determineUser();
		console.log(email);
		if(this.state.project_name.length < 1 || Number(this.state.goal_capacity) < 1 || this.state.city.length < 1 || this.state.state.length < 1){
			alert('Please enter valid data');
			return;
		} else {
			var bodyToUse = {}
			bodyToUse.project_name = this.state.project_name;
			bodyToUse.tag = this.state.tag;
			bodyToUse.start_date = this.state.start_date;
			bodyToUse.end_date = this.state.end_date;
			bodyToUse.curr_capacity = 0;
			bodyToUse.creator_email = email[0].email;
			var isNum = /^\d+$/.test(this.state.goal_capacity);
			if(!isNum){
				alert('Please enter a number for goal capacity');
				return;
			}
			if(Number(this.state.goal_capacity) < 1){
				alert('Please enter a number for goal capacity');
				return;
			}
			bodyToUse.goal_capacity= Number(this.state.goal_capacity);
			bodyToUse.city = this.state.city;
			bodyToUse.state = this.state.state;
			var res = await fetch('/api/projects/', { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(bodyToUse)});
			console.log(res);
			alert('Succesfully created project')
			window.location.href="/projectSearch";
		}
	}
	onChange = e =>{
		this.setState({ [e.target.id] : e.target.value});
	}

	render(){
		return(
			<div>
				<GeneralNavBar title={this.state.user != null ? this.state.user.name + "'s Page" : ""}> </GeneralNavBar>


	              <div className="input-field col s12">
	                <input
	                  onChange={this.onChange}
	                  value={this.state.project_name}
	                  id="project_name"
	                  type="text"
	                />
	                <label htmlFor="project_name">Project Name</label>

	              </div>


	              <div className="input-field col s12">
	                <select id="tag" size="5" onChange={this.onChange} value={this.state.tag}>
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
	                <label htmlFor="tag">Tag</label>
	              </div>

	              <div className="input-field col s12">
	                <input
	                  onChange={this.onChange}
	                  value={this.state.goal_capacity}
	                  id="goal_capacity"
	                  type="text"
	                />
	                <label htmlFor="goal_capacity">Goal Capacity</label>

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

	              <div>
	              	<DateRange
	              		onInit={this.handleSelect}
	              		onChange={this.handleSelect}
	              	/>
	              </div>
	              

	              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
	                <Button onClick={this.handleSubmit}>
	                  Create New Project
	                </Button>
	              </div>
	       
			</div>)
	}
}