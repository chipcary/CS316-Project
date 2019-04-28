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
import { Link } from "react-router-dom";
import IconButton from 'material-ui/IconButton';
import Details from 'material-ui/svg-icons/navigation/more-horiz';
import PropTypes from 'prop-types';
import TableActions from './TableActions'


export default class PageTable extends Component {
	constructor(props){
		super(props);

		this.state = {
			fixedHeader: true,
			fixedFooter: false,
			stripedRows: false,
			showRowHover: true,
			selectable: false,
			multiSelectable: false,
			enableSelectAll: false,
			deselectOnClickaway: false,
			showCheckBoxes: false,
			showDetails: true,
			page_name: this.props.page_name,
		};
	}

	getPropertyLabel = (col) => {
		return this.props.columns[this.props.table_properties.indexOf(col)];
	}

	displayValue(item, prop){


		switch(prop){
			case 'spots_left':
				return item["goal_capacity"]-item["curr_capacity"];
			case 'day_of_the_week':
				return String.toUpperCase(item['day_of_the_week'])
			default:
				return item[prop];
		}
	}

	/*determineSelected = (index, item) => {
		if(this.state.selectable){
			return this.props.selected_indexes.includes(index) || this.props.selected
		}
		return false;
	}*/

	determineColumns = () => {
		return this.props.table_properties.length + (this.state.showDetails ? 1: 0);
	}

	getTableSuperHeader = () => {
    	if(this.props.showHeader) {
        return (
          <TableRow className = "superrow">
            <TableHeaderColumn id = "pagetitle" className = "super" colSpan = {2}>{''}</TableHeaderColumn>
            <TableHeaderColumn className = "super" colSpan = {this.determineColumns() - 2}>
              <TableActions
                onFilterValueSelection = {this.props.onFilterValueSelection}
                onFilterValueChange = {this.props.onFilterValueChange}
                onRemoveFilter = {this.props.onRemoveFilter}
                page_name = {this.state.page_name}
              >
              </TableActions>
            
            </TableHeaderColumn>
          </TableRow>
        );
      }
    }

    getColumnComponent = (prop) => {
    	return (<TableHeaderColumn  >{this.getPropertyLabel(prop)}</TableHeaderColumn>);
  	}


	getDetailsCol = () => {
		{if(this.state.showDetails){
			return(
				<TableHeaderColumn> Details
				</TableHeaderColumn>
			);
		}}
	}

    render() {
    	return (
    		<div className = "table-container">
    		  <Table
          	    height={'413px'}
                fixedHeader={this.state.fixedHeader}
                fixedFooter={this.state.fixedFooter}
                selectable={this.state.selectable}
                multiSelectable={this.state.multiSelectable}>
        	  <TableHeader
            	displaySelectAll={this.state.enableSelectAll}
            	adjustForCheckbox={this.state.selectable}
            	enableSelectAll={this.state.enableSelectAll}>

              	{this.getTableSuperHeader()}

              	<TableRow className = "cols" selectable = {true} >
	                {this.props.table_properties.map(prop => 
	                  this.getColumnComponent(prop)
	                )}
                	{this.getDetailsCol()}
            	</TableRow>
              </TableHeader>

              <TableBody
	            displayRowCheckbox={false}
	            showRowHover={this.state.showRowHover}
	            stripedRows={this.state.stripedRows}>

	              {this.props.list_items.map((item, index) => 
	                <TableRow key={index}>
	                  {this.props.table_properties.map(prop => 
	                    <TableRowColumn
	                      key={prop}
	                      >
	                      {this.displayValue(item, prop)}
	                    </TableRowColumn>
	                   )}

	                   <div>
		                   <TableRowColumn>
	                        	<Link to={this.props.type == "User" ? `/users/${item.email}` : "/projectSearch"}>
	                          		<Details></Details>
	                          	</Link>
	                        	
	                    	</TableRowColumn>
                    	</div>

                    	                </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

PageTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  table_properties: PropTypes.arrayOf(PropTypes.string),
  list_items: PropTypes.arrayOf(PropTypes.object),
  quantities: PropTypes.arrayOf(PropTypes.string),
  selected_items: PropTypes.arrayOf(PropTypes.object),
  selected_indexes: PropTypes.array,
  handleSort: PropTypes.func,
  handleSelect: PropTypes.func,
  handleDetailViewSelect: PropTypes.func,
  handleQuantityChange: PropTypes.func,
  showHeader: PropTypes.bool,
  disable_inputs: PropTypes.bool
};



