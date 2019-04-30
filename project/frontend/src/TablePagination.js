import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TablePagination extends React.Component {
    constructor(props){
        super(props);
    }

    render = () => {
        return (
            <div className = "pagination-wrapper">
            <Pagination aria-label="Page navigation example">
            <div>


                {[...Array(this.props.pagesCount)].map((page, i) => 
                <PaginationItem active={i === this.props.currentPage} key={i}>
                    <PaginationLink onClick={e => {
                        this.props.handlePageClick(e, i)
                        // this.setState({
                        //     currentPage: i
                        // });
                        // this.loadDataFromServer();     
                    }
                } href="#">
                    {i}
                    </PaginationLink>
                </PaginationItem>
                )}


                </div>
                {this.props.getButtons != undefined ? this.props.getButtons() : <div></div>}
                </Pagination>
            </div>  
        );
    }
}


Pagination.propTypes = {
    currentPage: PropTypes.number,
    page_name: PropTypes.string,
    pagesCount: PropTypes.number,
    handlePageClick: PropTypes.func
}
