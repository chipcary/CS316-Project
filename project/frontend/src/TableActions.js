import React from 'react';
import PropTypes from 'prop-types';

import * as Constants from './Constants';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';

export default class TableActions extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page_name: this.props.page_name
		};
	}

	render() {
		var iconsize = {
			width: 10,
			height: 10,
		}
		return (
			<div>
			  <div>
			    <SearchIcon style = {{width: '20px', height: '20px'}} />

			    <TextField
			      hintText="Search by Name"
			      onChange = {(e, val) => this.props.onFilterValueChange(e, val, 'keyword')} />
			  </div>
			</div>
		);
	}
}

TableActions.propTypes = {
	table_options: PropTypes.array,
    onTableOptionSelection: PropTypes.func,
    onFilterValueSelection: PropTypes.func,
    onFilterValueChange: PropTypes.func, 
    onRemoveFilter: PropTypes.func
}