import React, { Component } from "react";
import classes from "./Home.module.css";
import Product from "../Product/Product";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";

class Home extends Component {
  
  componentDidMount() {
    this.props.onFetchProducts();
  }

  render() {
    let filteredList=[];
    let final=[];
    if (
      this.props.activeFilter.length === 0 ||
      this.props.activeFilter.length === this.props.filterList.length
    ) {
      filteredList = this.props.products;
    } else {
      filteredList = this.props.products.filter(item =>
        this.props.activeFilter.includes(item.type)
      );
    }
    let filteredPriceList=[];
    if (
      this.props.activePriceFilter.length === 0 ||
      this.props.activePriceFilter.length === this.props.priceList.length
    ) {
      filteredPriceList = filteredList;
    } else {
      filteredPriceList = this.props.activePriceFilter.map(item => {
        let l= item[0];
        let h = item[1];
        return(
          filteredList.filter(item => (
            l <= item.price && item.price <= h
          ))
        )
      }
      );
      filteredPriceList.map(f => final.push(...f));
      filteredPriceList = [...final];
    }
    return (
      <Aux>
        <div className={classes.bg}>
        <div className={classes.sidenav}>
          <h2 style={{color:'white'}}>Categories</h2>
          <hr/>
          <p  style={{color:'white',cursor:'pointer'}} onClick={this.props.onClearAll}>Clear all</p>
          <h3>Makeup</h3>
          {this.props.filterList.map((filter,index) =>(
            <Aux key={index}>
               <label  className={classes.containerCheck}> {filter.name}
                <input id={filter.id} type="checkbox"
                 checked={this.props.activeFilter.includes(filter.value)}
                 onChange={() => this.props.onAddRemoveFilter(filter.value)}/>
                <span className={classes.checkmark}></span>
                </label>
            </Aux>
          ))}
          <hr/>
          <h3>Price</h3>
          {this.props.priceList.map((filter,index) =>(
            <Aux key={index}>
                <label  className={classes.containerCheck}> {filter.name}
                  <input type="checkbox" 
                   checked={this.props.activePriceFilter.includes(filter.value)}
                   onChange={() => this.props.onAddRemovePriceFilter(filter.value)} />
                  <span className={classes.checkmark}></span>
                </label>
            </Aux>
          ))}
        </div>
        <div className={classes.main}>
        <div className={classes.Home}>
          {filteredPriceList.map((product, index) => (
            <Product
              name={product.name}
              key={index}
              img={product.img}
              id={product.id}
              description={product.description}
              price={product.price}
              inventory={product.inventory}
              rating={product.rating}
              rater={product.rater}
              disabled={product.inventory === 0}
            />
          ))}
        </div>
        </div>
        </div>
        
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.prod.products,
    priceList: state.fil.priceList,
    filterList:state.fil.filterList,
    activeFilter:state.fil.activeFilter,
    activePriceFilter:state.fil.activePriceFilter
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.fetchProducts()),
    onAddRemoveFilter: (filter) => dispatch(actions.addRemoveFromFilter(filter)),
    onAddRemovePriceFilter:(filter) => dispatch(actions.addRemoveFromPriceFilter(filter)),
    onClearAll: () => dispatch(actions.clearAll())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
