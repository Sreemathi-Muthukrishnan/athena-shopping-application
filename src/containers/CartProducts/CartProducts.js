import React, { useEffect } from "react";
import classes from "./CartProducts.module.css";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Cart from '../Cart/Cart';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const CartProducts = (props) => {
    const {cart} = props;
    
    useEffect(() =>{
      props.onFetchCart(props.user,props.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    useEffect(()=>{
      outofstock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cart]);
    const outofstock =() =>{
      props.cart.map(product => axios.get(process.env.REACT_APP_BACKEND_URL+ '/products/'+product.productId)
      .then(response =>{
          if(response.data.product.inventory === 0 && product.available ){
            props.onOutOfStock(product.productId,product.name)
          }
      }).catch(err=>{
          throw(err);
      }))
    }
    const checkout =() =>{
      props.history.push('/checkout');
      props.onCheckout();
    }

      let cartItems = null;
      if(props.cart){
        cartItems=props.cart.map((cartItem,index)=>(
          <Cart img={cartItem.img} name={cartItem.name} key={index} id={cartItem.id} available={cartItem.available}
          description={cartItem.description} price={cartItem.price} quantity={cartItem.quantity}
          inventory={cartItem.inventory}/>
      ))
      }
    return (
      <Aux>
        <div style={{ textAlign: "center", width: "70%", margin: "auto" }}>
          <h2 style={{ color: "#912a73" }}>{props.cart.length !== 0 ? 'You have made the right choice!' : 'Your cart is empty!' }</h2>
          {props.cart.length === 0 && <img src="https://chillydraji.files.wordpress.com/2015/08/empty_cart.jpeg" className={classes.CartEmptyImage} alt="cart-empty"/>}
         {props.cart.length !== 0  ? <button disabled={!props.purchasable} className={classes.Cartbutton} onClick={checkout}>
            Checkout <i className="fas fa-shopping-cart"></i>
          </button> :  null}
        </div>
        <div className={classes.CartProducts}>
            {cartItems}
        </div>
      </Aux>
    );
  }


const mapStateToProps = state =>{
  return{
    products: state.prod.products,
    cart:state.prod.cart,
    user:state.prod.user,
    token: state.prod.token,
    purchasable:state.prod.purchasable

  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onCheckout: () => dispatch(actions.checkoutOrder()),
    onFetchCart: (user,token) => dispatch(actions.fetchCart(user,token)),
    onOutOfStock: (id,name) => dispatch(actions.outOfStock(id,name)),
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CartProducts));
