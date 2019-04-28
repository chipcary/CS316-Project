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
import TableActions from './TableActions'


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
		return false;
	}

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
				<TableHeaderColumn> "Details"
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
                multiSelectable={this.state.multiSelectable}
                onRowSelection = {(res) => this.props.handleSelect(res)}>
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
	            displayRowCheckbox={this.state.showCheckboxes}
	            deselectOnClickaway={this.state.deselectOnClickaway}
	            showRowHover={this.state.showRowHover}
	            stripedRows={this.state.stripedRows}>

	              {this.props.list_items.map((item, index) => 
	                <TableRow className = {`myrow ${this.state.showCheckboxes ? " trselect":""} ${item.enabled ? 'enabled' : ''}`} selected = {this.determineSelected(index, item)} key={index}>
	                  {this.props.table_properties.map(prop => 
	                    <TableRowColumn
	                      key={prop}
	                      onClick={e => this.props.handleSelect(e, item)}>
	                      {this.displayValue(item, prop)}
	                    </TableRowColumn>
	                   )}

	                   <div>
		                   (<TableRowColumn>
	                        	<IconButton onClick={(e) => this.props.handleDetailViewSelect(e, item) }>
	                          		<Details></Details>
	                        	</IconButton>
	                    	</TableRowColumn>)
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



