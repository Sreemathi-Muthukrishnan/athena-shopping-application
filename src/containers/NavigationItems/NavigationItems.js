import React, { Component } from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { connect } from "react-redux";
import { animateScroll as scroll } from "react-scroll";
import { NavLink } from "react-router-dom";
import * as actions from '../../store/actions/index';
class NavigationItems extends Component {
  searchList = (event) => {
    const searchItem = event.target.value;
    this.props.onSearchList(searchItem);
  };
  scrollToBottomContact =() =>{
    scroll.scrollToBottom(); 
  }
  render() {
    return (
      <ul className={classes.NavigationItems}>
         <div className={classes.searchBox}>
          <input onChange={this.searchList} type="text" placeholder="Search.." />
          <span className={classes.search}>
            <i className="fa fa-search"></i>
          </span>
        </div>
        {!this.props.token ? (
          <NavigationItem link="/login" >
           <i className="fas fa-sign-in-alt"></i> Login/Signup
          </NavigationItem>
        ) : null}
          <NavigationItem link="/cart">
            <i className="fas fa-shopping-cart">
              <span>-{this.props.cart.length}</span>
            </i>{" "}
          </NavigationItem>
          <NavigationItem link="/orders">
            <i className="fas fa-shopping-bag"></i> 
            <span>-{this.props.orders.length}</span>
          </NavigationItem>
       
        
         <div className={classes.dropdown}>
         <button className={classes.dropbtn}>
         <i className="fas fa-user"></i> My Account <i className="fa fa-caret-down"></i>
         </button>
         <div className={classes.dropdowncontent}>
           {!this.props.token ? <NavLink to="/login"> Login/Signup </NavLink> : null}
           <NavLink to="/cart">My Cart</NavLink>
           <NavLink to="/orders">My Orders</NavLink>
           <NavLink to="/" onClick={this.scrollToBottomContact}>Contact Us</NavLink>
           {this.props.token ? <NavLink to="/logout">Logout</NavLink> : null}
         </div>
       </div>
        
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.prod.login,
    token:state.prod.token,
    cart: state.prod.cart,
    orders: state.prod.orders
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchList: (product) => dispatch(actions.searchProducts(product)),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(NavigationItems);
