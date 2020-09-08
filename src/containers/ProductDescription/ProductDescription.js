import React, { Component } from "react";
import classes from "./ProductDescription.module.css";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
class ProductDescription extends Component {
  addCart=() =>{
    const oldCart = this.props.cart;
    const cart ={
      product:this.props.product,
      user:this.props.user
    }
    this.props.onAddToCart(cart,oldCart,this.props.token);
  }
  render() {
    return (
    <Aux>
      <div style={{textAlign:'center',width:'70%',margin:'auto'}}>
      <h2 style={{ color: '#912a73' }}>What are you waiting for? Grab your favourite products while the sale is still on!</h2>
      </div>
      
      <div className={classes.ProductDescription}>
          <img
            src={this.props.product.img}
            alt="Matte Lipstick"
          />
        <div className={classes.container}>
          <h2>{this.props.product.name}</h2>
          <p className={classes.price}>INR {this.props.product.price}</p> 
          {this.props.product.rater !==0 && <p className={classes.price}>{this.props.product.rating} <span style={{color:'#FDCC0D'}} className="fa fa-star checked"></span></p>}
          {this.props.product.rater !==0 && <p className={classes.noUser}>{this.props.product.rating} / 5 based on {this.props.product.rater} ratings</p>}
          <p style={{fontFamily: 'Merienda, cursive'}}>{this.props.product.description}</p>
          <p>Quantity</p>
         <p>
         <button onClick={this.props.onQuantityDecrease} className={classes.quantityButton}>-</button> {this.props.product.quantity} <button disabled={this.props.product.quantity >= this.props.product.inventory} onClick={this.props.onQuantityIncrease} className={classes.quantityButton} >+</button>
         </p> 
            <button className={classes.Button} onClick={this.addCart} disabled={!this.props.loggedIn || this.props.product.inventory === 0 || this.props.product.quantity > this.props.product.inventory}>{this.props.product.inventory === 0 ? 'OUT OF STOCK' : 'Add to Cart'}</button>
        </div>
      </div>
      </Aux>
    );
  }
}

const mapStateToProps=state=>{
  return{
    product:state.prod.product,
    loggedIn:state.prod.login,
    user:state.prod.user,
    token:state.prod.token,
    cart: state.prod.cart
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onAddToCart : (cart,oldCart,token) => dispatch(actions.addToCart(cart,oldCart,token)),
    onQuantityIncrease : () => dispatch(actions.productItemQuantityIncrease()),
    onQuantityDecrease : () => dispatch(actions.productItemQuantityDecrease()),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductDescription);
