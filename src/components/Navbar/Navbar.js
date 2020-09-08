import React ,{ useEffect }from "react";
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import NavigationItems from "../../containers/NavigationItems/NavigationItems";
import Logo from "../Logo/Logo";


const Navbar = (props) => {
  const { onFetchCart, cart , user, token, onFetchOrders, orders } = props;
  useEffect(()=>{
    onFetchCart(user,token);
    onFetchOrders(user,token)
  },[cart.length,user,onFetchCart,token,orders.length,onFetchOrders]);
  return (
    <header className={classes.Navbar}>
      <div className={classes.flexBox}>
        <Logo className={classes.Logo} />
        <NavLink to="/home">
        <h2 style={{ color: "white", fontFamily: "Merienda, cursive" }}>
          Athena
        </h2>
        </NavLink>
      </div>
     
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
};

const mapStateToProps = state =>{
  return{
    user: state.prod.user,
    cart:state.prod.cart,
    token:state.prod.token,
    orders:state.prod.orders,
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onFetchCart : (user,token) =>  dispatch(actions.fetchCart(user,token)),
    onFetchOrders: (user,token) =>dispatch(actions.fetchOrders(user,token)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
