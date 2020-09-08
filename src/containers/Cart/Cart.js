import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from "./Cart.module.css";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
class Cart extends Component {
  removeFromCart =(id,token) =>{
    this.props.onRemoveCartItem(id,token);
    this.props.onPurchasable();
  }
  render() {
    return (
      <Aux>     
        <div className={classes.Cart}>
          <img src={this.props.img} alt="product-img" />
          <div className={classes.container}>
            <p>{this.props.name}</p>
            <p className={classes.price}>{this.props.available ? 'INR ' + this.props.price : 'out of stock'}</p>
            <button onClick={()=>{this.props.onRemoveItem(this.props.id)}}>-</button> {this.props.quantity} <button disabled={this.props.quantity >= this.props.inventory} onClick={()=>{this.props.onAddItem(this.props.id)}}>+</button>
            <button className={classes.Button} onClick={() =>this.removeFromCart(this.props.id,this.props.token)}>Remove from Cart</button>
          </div>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state =>{
  return{
    token:state.prod.token
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onAddItem :(id)=> dispatch(actions.cartItemQuantityIncrease(id)),
    onRemoveItem:(id) => dispatch(actions.cartItemQuantityDecrease(id)),
    onRemoveCartItem:(id,token) =>dispatch(actions.deleteFromCart(id,token)),
    onPurchasable: () => dispatch(actions.onPurchasable())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);
