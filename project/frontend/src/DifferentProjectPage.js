import React from 'react';
import PropTypes from 'prop-types';
import PageTable from './PageTable';
import * as Constants from './Constants';
import GeneralNavBar from './GeneralNavBar';
import {Button} from 'reactstrap';
import './CenteredListingPage.css';
import AuthRoleValidation from './AuthRoleValidation';
import {Link} from 'react-router-dom';

export default class DifferentProjectPage extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			project_id : this.props.match.params.pid,
			project: null,
			creator_email: null,
			creator: null,
			members: [],
			table_columns: ["Name", "City", "State"],
			table_properties: ["name", "city", "state"],
			editable: false,
			user_email: null,
		}

		//this.determineUser = this.determineUser.bind(this);
		this.loadDataFromServer = this.loadDataFromServer.bind(this);
		this.loadMembersFromServer = this.loadMembersFromServer.bind(this);
		this.loadCreatorFromServer = this.loadCreatorFromServer.bind(this);
		this.leaveProject = this.leaveProject.bind(this);
		this.joinProject = this.joinProject.bind(this);
	}
/*
	async determineUser(){
		var user = AuthRoleValidation.determineUser();
		var email = user[0].email;
		console.log(email);
		if(email == this.state.creator_email){
			this.setState({
				editable:true,
			})
		}
		this.setState({
			user_email: email,
		})
	}*/

	async loadDataFromServer(){
		var email = await AuthRoleValidation.determineUser();
		console.log(email);
		this.setState({
			user_email: email[0].email,
		})
		var path = '/api/projects/' + this.state.project_id;
		var project = await fetch(path, {method: 'GET'})
			.then(data => data.json())
			.then((res) => {
				console.log(res);
				this.setState({
					project: res,
					creator_email: res["creator_email"],
				});
			});
	}

	async loadCreatorFromServer(){
		var path = '/api/users/' + this.state.creator_email;
		var creator = await fetch(path, {method: 'GET'})
			.then(data => data.json())
			.then((res) => {
				this.setState({
					creator: res[0], 
				});
			});
	}

	async componentDidMount(){
		await this.loadDataFromServer();
		await this.loadMembersFromServer();
		await this.loadCreatorFromServer();
		this.determineUser();
	}

	async componentDidUpdate(prevProps, prevState){

	}

	async loadMembersFromServer(){
		var alreadyPresent = false;
		var path = '/api/projects/' + this.state.project_id + "/members";
		var members = await fetch(path, {method: 'GET'})
			.then(data => data.json())
			.then((res) => {
				var tempArr = []
				for(var i = 0; i < res.length; i++){
					tempArr.push(res[i]["User"]);
					if(res[i]["User"].email == this.state.user_email) alreadyPresent = true;
				}
				this.setState({
					members: tempArr,
				});
				if(alreadyPresent){
					this.setState({
						canJoin: false,
						canLeave: true,
					})
				} else {
					this.setState({
						canJoin: true,
						canLeave: false,
					})
				}
			});
	}

	async leaveProject(){
		var path = '/api/projects/' + this.state.project_id + '/users/' + this.state.user_email;
		var leave = await fetch(path, {method: 'DELETE'});
		this.loadMembersFromServer();
		this.loadDataFromServer();
	}

	async joinProject(){
		var path = '/api/projects/' + this.state.project_id + '/users/' + this.state.user_email;
		var leave = await fetch(path, {method: 'POST'});
		this.loadMembersFromServer();
		this.loadDataFromServer();
	}

	render() {
		return (
			<div>
				<GeneralNavBar title={this.state.project != null ? this.state.project.project_name + " Project Page" : ""}> </GeneralNavBar>
				<div className="paddedDiv">
					Project Name:
					{this.state.project != null ? " " + this.state.project.project_name : ""}
				</div>

				{this.state.creator_email != null && <div className="paddedDiv">
					<Link to={`/users/${this.state.creator_email}`}> Created By:
					{this.state.creator != null ? " " + this.state.creator.name : ""}
					</Link>
				</div>}

				<div className="paddedDiv">
					Project tag:
					{this.state.project != null ? " " + this.state.project.tag : ""}
				</div>

				<div className="paddedDiv">
					State:
					{this.state.project != null ? " " + this.state.project.state : ""}
				</div>

				<div className="paddedDiv">
					Project Duration:
					{this.state.project != null ? " " + this.state.project.start_date.substring(0,10) + " until " + this.state.project.end_date.substring(0,10) : ""}
				</div>

				<div className="paddedDiv">
					Spots available:
					{this.state.project != null ? " " + this.state.project.curr_capacity + " members out of " + this.state.project.goal_capacity + " are participating in this project" : ""}
				</div>

				{this.state.members.length > 0 ?
					<div className="paddedDiv">
						Below are the members participating in Project {this.state.project.project_name} 
						<PageTable
							type={"User"}
							columns={this.state.table_columns}
							table_properties={this.state.table_properties} 
		                    list_items={this.state.members}
		                    showHeader = {false}
		                    filters = {this.state.filters}
		                    onFilterValueSelection = {this.onFilterValueSelection}
		                    onFilterValueChange = {this.onFilterValueChange}
		                    onRemoveFilter = {this.onRemoveFilter} />
	                 </div>: " "}

	             {this.state.editable == true ?
	             	<div className="paddedDiv">
	             		<Button>
	             			Edit Project
	             		</Button>
	             	</div> : " "}
	             {this.state.canJoin == true ?
	             	<div className="paddedDiv">
	             		<Button onClick={this.joinProject}>
	             			Join Project
	             		</Button>
	             	</div> : " "}

	             {this.state.canLeave == true ?
	             	<div className="paddedDiv">
	             		<Button onClick={this.leaveProject}>
	             			Leave Project
	             		</Button>
	             	</div> : " "}

			</div>
		)
	}
}