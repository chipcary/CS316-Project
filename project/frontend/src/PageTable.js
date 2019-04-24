import React, {Component} from 'react';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import * as Constants from './Constants';
import {Input} from 'reactstrap';
import IconButton from 'material-ui/IconButton';
import Details from 'material-ui/svg-icons/navigation/more-horiz';
import PropTypes from 'prop-types';


export default class PageTable extends Component {
	constructor(props){
		super(props);

		this.state = {
			fixedHeader: true,
			fixedFooter: false,
			stripedRows: false,
			showRowHover: true,
			selectable: true,
			multiSelectable: false,
			enableSelectAll: false,
			deselectOnClickaway: false,
			showCheckBoxes: true,
			showDetails: true,
			page_name: this.props.page_name,
		};
	}

	getPropertyLabel = (col) => {
		return this.props.columns[this.props.table_properties.indexOf(col)];
	}

	displayValue(item, prop){
		return item[prop];
	}

	determineSelected = (index, item) => {
		if(this.state.selectable){
			return this.props.selected_indexes.includes(index) || this.props.selected
		}
	}

}