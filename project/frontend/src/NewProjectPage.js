import React from 'react';
import GeneralNavBar from './GeneralNavBar';
import {Button} from 'reactstrap';

export default class newProjectPage extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			project_name: ""
			tag: "",
			start_date: "",
			end_date: "",
			curr_capacity: "1",
			goal_capacity: "",
			city: "",
			state: "",
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
	                <input
	                  onChange={this.onChange}
	                  value={this.state.city}
	                  id="city"
	                  type="text"
	                />
	                <label htmlFor="city">City</label>
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

	            <button onClick={this.deleteUser}
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
	                  Delete User
	                </button>

			</div>)
	}
}