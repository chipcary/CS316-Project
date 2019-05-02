import React from 'react';
import PropTypes from 'prop-types';
import PageTable from './PageTable';
import * as Constants from './Constants';
import GeneralNavBar from './GeneralNavBar';
import AuthRoleValidation from "./AuthRoleValidation"

export default class RecommmendedProjectSearchPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page_name: "projects_page",
			page_title: "Projects",
			table_columns: ["Name", "Start Date","End Date","Spots Left", "City", "State"],
			table_properties: ["project_name", "start_date","end_date","spots_left","city","state"],
			detail_view_item: {},
			detail_view_options: [],
			detail_view_action:'',
			data:[],
			currentPage: 0,
			pagesCount : 0,
			filters: {
				'keyword': '',
			},
			filterChange: false,
		}

		this.loadDataFromServer = this.loadDataFromServer.bind(this);
		/*this.toggle = this.toggle.bind(this);
		*/
		this.onFilterValueChange = this.onFilterValueChange.bind(this);
		this.onFilterValueSelection = this.onFilterValueSelection.bind(this);
		//this.setInitPages();
	}
/*
	toggle = (modalType) => {
		switch(modalType){

		}
	}*/

	async componentDidMount() {
		await this.loadDataFromServer();
	}

	async componentDidUpdate(prevProps, prevState){
		if(this.state.filterChange){
			await this.loadDataFromServer();
			this.state.filterChange = false;
		}
	}

	async loadDataFromServer() {
		var user = await AuthRoleValidation.determineUser();
		var email = user[0].email;
		console.log(this.state.filters['keyword'] == "")
		if(this.state.filters['keyword'] == ""){
			var path = '/api/projects/' + email + '/best';
			var users = await fetch(path , { method: 'GET' })
				.then(data => data.json())
				.then((res) => {
					console.log(res);
					console.log(JSON.stringify(res));
					this.setState({
						data: res,
						pagesCount: 0,
					});
				});
		} else {
			var path = '/api/projects/' + email + "/best?substr=" + this.state.filters['keyword'];			
			var users = await fetch(path, {method: 'GET'})
				.then(data => data.json())
				.then((res) => {
					console.log(res);
					console.log(JSON.stringify(res));
					this.setState({
						data: res,
						pagesCount: 0,
					});
				});
		}
	}
/*
	async checkCurrentPageInBounds(dataResAll){
		var prev = this.state.previousPage;
		if(dataResAll === undefined || !dataResAll.success){
			this.setState({
				currentPage: 0,
				previousPage: prev,
				pagesCount: 0,
			});
		} else {
			var dataLength = dataResAll.data.legnth;
			var curCount = Math.ceil(dataLength/Number(this.state.pageSize));
			if(curCount != this.state.pagesCount){
				if(this.state.currentPage >= curCount){
					this.setState({
						currentPage: 0,
						previousPage: prev, 
						pagesCount: curCount,
					});
				}
			    else {
					this.setState({ 
						pagesCount: curCount, 
					});
				}
			}
		}
	}
*/
	/*async setInitPages(){
		let allData = await SendRequest.getAllUserData();
		var currCount = 0;
		if (allData != undefined){
			if(allData.data != undefined){
				curCount = Math.ceil(allData.data.length/Number(this.state.pageSize));
			}
		}
		this.setState({
			currentPage: 0,
			previousPage: 0,
			pagesCount: curCount,
		});
	}*/

	onFilterValueChange = (e, value, filterType) => {
		var filters = this.state.filters;
		if(filterType == 'keyword'){
			var valToUse = value.replace(/[^a-z0-9\s-]/ig, "");
			filters[filterType] = valToUse;
		}
		this.setState({ filters: filters, filterChange: true});
	}

	/*handlePageClick = (e, index) => {
		e.preventDefault();
		this.setState({
			currentPage: index
		});
	}*/

	onFilterValueSelection (vals, e, type) {
		var filters = this.state.filters;
		filters[type] = []
		vals.map((item) => {
			filters[type].push(item.value._id);
		})
		this.setState({
			filters: filters,
			filterChange: true
		});
	}

	render () {
		return (
			<div>
			    <GeneralNavBar title={"Recommended Project Search Page"}></GeneralNavBar>
				<div>
					<PageTable
						type={"Project"}
						columns={this.state.table_columns}
						table_properties={this.state.table_properties} 
                        list_items={this.state.data}
                        title = {this.state.page_title}
                        showHeader = {true}
                        filters = {this.state.filters}
                        onFilterValueSelection = {this.onFilterValueSelection}
                        onFilterValueChange = {this.onFilterValueChange}
                        onRemoveFilter = {this.onRemoveFilter} />
                </div>
            </div>
        )
    }
}