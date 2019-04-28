import React from 'react';
import PropTypes from 'prop-types';
import PageTable from './PageTable';
import SubmitRequest from './SubmitRequest';
import * as Constants from './Constants';

export default class ListPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page_name: "users_page",
			page_title: "Users",
			table_columns: ["Name"],
			table_properties: ["name"],
			detail_view_item: {},
			detail_view_options: [],
			detail_view_action:'',
			data:[],
			currentPage: 0,
			previousPage: 0,
			pageSize: props.simple ? 4:20,
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
		}
	}

	async loadDataFromServer() {
		let allData = await SubmitRequest.getAllUsers();
		console.log(allData);
		await this.setState({
			data: allData.data,
			filterChange: false,
		})	
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

	render () {
		return (
			<div className="list-page">
				<div>
					<PageTable
						columns={this.state.table_columns}
						table_properties={this.state.table_properties} 
                        list_items={this.state.data}
                        selected_items={this.state.selected_items}
                        selected_indexes = {this.state.selected_indexes}
                        showDetails = {true}
                        selectable = {this.props.simple !=undefined ? !this.props.simple : true}
                        sortable = {this.props.simple != undefined ? !this.props.simple : true}
                        title = {this.state.page_title}
                        showLoading = {this.props.simple ? false : true}
                        showHeader = {true}
                        filters = {this.state.filters}
                        table_options = {this.state.table_options}
                        onFilterValueSelection = {this.onFilterValueSelection}
                        onFilterValueChange = {this.onFilterValueChange}
                        onRemoveFilter = {this.onRemoveFilter} />
                </div>
            </div>
        )
    }
}