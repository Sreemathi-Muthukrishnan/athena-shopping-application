import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from "./Checkout.module.css";
import { withRouter } from 'react-router-dom';
class Checkout extends Component {
    placeOrderHandler =() =>{
        this.props.history.push('/contact-data');
    }
  render() {
    let cartItems = this.props.cart.map((item,index) => (
      <div className={classes.card} key={index}>
        <img src={item.img} alt="item-img" style={{ width: "100px" }} />
        <div className={classes.container}>
          <h4>
            <b>{item.name}</b>
          </h4>
          <p>Price: {item.price}</p>
          <p>Quantity : {item.quantity}</p>
        </div>
      </div>
    ));
    return (
      <Aux>
        <div style={{ textAlign: "center", margin: "auto" }}>
          <h3 style={{ fontFamily: 'Merienda, cursive',color:'#912a73'}}>Only two more steps to go!</h3>
          <h1>Order Total : INR {this.props.totalPrice}</h1>
          <div className={classes.cardWrapper}>{cartItems}</div> 
          <button onClick={this.placeOrderHandler} className={classes.Checkoutbutton}>Place Order</button>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalPrice: state.prod.totalPrice,
    cart: state.prod.cart,
  };
};
export default withRouter(connect(mapStateToProps)(Checkout));
