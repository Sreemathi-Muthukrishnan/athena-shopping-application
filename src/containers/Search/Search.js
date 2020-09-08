import React, { Component } from "react";
import classes from "./Search.module.css";
import { connect } from "react-redux";
import * as actions from '../../store/actions/index';

class Search extends Component {
    searchList = (event) => {
        const searchItem = event.target.value;
        this.props.onSearchList(searchItem);
      };
  render() {
    return (
    <div>
        <div className={classes.wrap}>
        <div className={classes.search}>
          <input
            type="text" onChange={this.searchList}
            className={classes.searchTerm}
            placeholder="Search For Events...."
          />
          <button type="button" className={classes.searchButton}>
            <i className="fa fa-search" />
          </button>
        </div>
      </div>
    </div>
      
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onSearchList: (product) => dispatch(actions.searchProducts(product)),
    };
  };
export default connect(null,mapDispatchToProps)(Search);
