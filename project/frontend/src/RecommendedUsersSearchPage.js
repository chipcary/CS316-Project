import React from 'react';
import PropTypes from 'prop-types';
import PageTable from './PageTable';
import * as Constants from './Constants';
import GeneralNavBar from './GeneralNavBar';
import TablePagination from './TablePagination';
import AuthRoleValidation from './AuthRoleValidation'
import {Input} from 'reactstrap';

export default class RecommendedUsersSearchPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page_name: "users_page",
			page_title: "Users",
			table_columns: ["Name", "City", "State"],
			table_properties: ["name", "city", "state"],
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
			recommended: false,
		}

		this.loadDataFromServer = this.loadDataFromServer.bind(this);
		/*this.toggle = this.toggle.bind(this);
		*/
		this.onFilterValueChange = this.onFilterValueChange.bind(this);
		this.onFilterValueSelection = this.onFilterValueSelection.bind(this);
		this.toggleCheckbox = this.toggleCheckbox.bind(this);
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
		}
	}


	async loadDataFromServer() {
		var user = await AuthRoleValidation.determineUser();
		var email = user[0].email;
		console.log('gets here');
		if(this.state.filters['keyword'] != ""){
			var currPage = Number(this.state.currentPage) + 1;
			var path = '/api/users/' + email + '/match?substr=' + this.state.filters['keyword'] + '&loc=true' + '&page=' + currPage;
			var users = await fetch(path , { method: 'GET' })
				.then(data => data.json())
				.then((res) => {
					console.log(res);
					console.log(JSON.stringify(res));
					this.setState({
						data: res.rows,
						pagesCount: res.pages,
					});
				});
		} else {
			var currPage = Number(this.state.currentPage) + 1;
			var path = '/api/users/' + email +'/match?page=' +  currPage;
			var users = await fetch(path, {method: 'GET'})
				.then(data => data.json())
				.then((res) => {
					console.log(res);
					console.log(JSON.stringify(res));
					this.setState({
						data: res.rows,
						pagesCount: res.pages,
					});
				});
		}
	}

	handlePageClick = (e, index) => {
		e.preventDefault();
		if(index < 0 || index > this.state.pagesCount){
			return;
		}
		else {
			this.setState({
				currentPage: index,
			});
			this.loadDataFromServer();
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
			filters[filterType] = value;
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

	async toggleCheckbox(){
		console.log('hello23123123');
		this.set.state({
			recommended: !this.state.recommended,
		})
		await this.loadDataFromServer();
	}

	render () {
		return (
			<div>
			    <GeneralNavBar title={"Users Search Page"}></GeneralNavBar>
				<div>
					<PageTable
						type={"User"}
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
                <div>
                <TablePagination
                	currentPage={this.state.currentPage}
                	pagesCount= {this.state.pagesCount}
                	handlePageClick={this.handlePageClick} />
                </div>
            </div>
        )
    }
}