import React from 'react';
import PropTypes from 'prop-types';
import PageTable from './PageTable';
import * as Constants from './Constants';
import GeneralNavBar from './GeneralNavBar';
import {Button} from 'reactstrap';
import './CenteredListingPage.css';

export default class DifferentUserPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user_email: this.props.match.params.user_email,
			user: null,
			projects_created: [],
			projects_joined: [],
			userInterests: "",
			table_columns: ["Name", "Start Date","End Date","Spots Left", "City", "State"],
			table_properties: ["project_name", "start_date","end_date","spots_left","city","state"],
		}

		this.loadDataFromServer = this.loadDataFromServer.bind(this);
		this.testMethod = this.testMethod.bind(this);
	}

	async testMethod() {

	}

	async loadProjectsJoinedFromServer(){
		var path = '/api/projects/' + this.state.user_email + '/joined';
		var projects = await fetch(path, {method: 'GET'})
			.then(data => data.json())
			.then((res) => {
				var tempArr = []
				for(var i = 0; i < res.length; i++){
					tempArr.push(res[i]["Project"]);
				}
				this.setState({
					projects_joined: tempArr
				});
			});
	}

	async loadProjectsCreatedFromServer(){
		var path = '/api/projects/' + this.state.user_email + '/created';
		var projects = await fetch(path, {method: 'GET'})
			.then(data => data.json())
			.then((res) => {
				this.setState({
					projects_created: res,
				})
			});
	}

	async loadDataFromServer(){
		var path = '/api/users/' + this.state.user_email;
		var user = await fetch(path, {method: 'GET'})
			.then(data => data.json())
			.then((res) => {
				console.log(res);
				var interestString = " ";
				if(res[0].UserInterest != null && res[0].UserInterest.interest1 != null){
					interestString = interestString + res[0].UserInterest.interest1 + ", "
				}
				if(res[0].UserInterest != null && res[0].UserInterest.interest2 != null){
					interestString = interestString + res[0].UserInterest.interest2 + ", "
				}
				if(res[0].UserInterest != null && res[0].UserInterest.interest3 != null){
					interestString = interestString + res[0].UserInterest.interest3 + ", "
				}
				if(interestString.length > 1){
					var length = interestString.length-2
					interestString = interestString.substring(0,length);
				}
				this.setState({
					user: res[0],
					userInterests: interestString,
				});
			});
	}

	async componentDidMount(){
		await this.loadDataFromServer();
		await this.loadProjectsCreatedFromServer();
		await this.loadProjectsJoinedFromServer();
	}

	async componentDidUpdate(prevProps, prevState){
		// this.loadDataFro
	}

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

				<div className="paddedDiv">
					City: 
					{this.state.user != null ? " " + this.state.user.city  : ""}
				</div>

				<div className="paddedDiv">
					State: 
					{this.state.user != null ? " " + this.state.user.state  : ""}
				</div>

				<div className="paddedDiv">
					Interests: 
					{this.state.user != null ? this.state.userInterests : " "}
				</div>

				{this.state.projects_created.length > 0 ?
					<div className="paddedDiv">
						{this.state.user.name} has created the following projects
						<PageTable
							type={"Project"}
							columns={this.state.table_columns}
							table_properties={this.state.table_properties} 
	                        list_items={this.state.projects_created}
	                        showHeader = {false}
	                        filters = {this.state.filters}
	                        onFilterValueSelection = {this.onFilterValueSelection}
	                        onFilterValueChange = {this.onFilterValueChange}
	                        onRemoveFilter = {this.onRemoveFilter} />
	                </div> : this.state.user != null ? this.state.user.name + " has not created any projects" : ""}

                {this.state.projects_joined.length > 0 ?
					<div className="paddedDiv">
						{this.state.user.name} has joined the following projects
						<PageTable
							type={"Project"}
							columns={this.state.table_columns}
							table_properties={this.state.table_properties} 
	                        list_items={this.state.projects_joined}
	                        showHeader = {false}
	                        filters = {this.state.filters}
	                        onFilterValueSelection = {this.onFilterValueSelection}
	                        onFilterValueChange = {this.onFilterValueChange}
	                        onRemoveFilter = {this.onRemoveFilter} />
	                </div> : this.state.user != null ? this.state.user.name +" has not joined any projects" : ""}

			</div>
			)
	}
}