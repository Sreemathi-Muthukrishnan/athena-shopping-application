import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import classes from "./Orders.module.css";
import StarRating from '../StarRating/StarRating';

class Orders extends Component {
  state={
    rating:0
  }
  componentDidMount() {
    this.props.onFetchOrders(this.props.user, this.props.token);
  }
  setRating = rating => {
    this.setState({ rating: rating });
  };
  saveRating = (product,id) => {
    alert("Thanks for your rating!");
    let updateProduct ={...product};
    updateProduct.rating = this.state.rating;
    console.log(updateProduct);
    this.props.onUpdateProductRating(updateProduct,id);
  };
  render() {
    let orders = (
      <div>
        <h1>You have no orders!</h1>
        {this.props.orders.length === 0 && (
          <img
            src="https://i.pinimg.com/originals/81/c4/fc/81c4fc9a4c06cf57abf23606689f7426.jpg"
            alt="orders-empty"
            className={classes.OrderEmptyImage}
          />
        )}
      </div>
    );
    if (this.props.orders.length !== 0) {
      orders = this.props.orders.map((item, index) => (
        <div className={classes.orderCard} key={index}>
          <img
            src={item.img}
            alt="item-img"
            style={{ width: "100px"}}
          />
          <div className={classes.orderContainer}>
            <h4>
              <b>{item.name}</b>
            </h4>
            <p>Price: {item.price}</p>
            <p>Quantity : {item.quantity}</p>
            <StarRating numberOfStars="5"
              currentRating="0" onClick={this.setRating} />
            <button className={classes.rateButton} onClick={()=>this.saveRating(item,item.productId)}><span className="fa fa-star checked"></span> Rate the product</button>
          </div>
        </div>
      ));
    }
    return (
      <div style={{ textAlign: "center", margin: "auto" }}>
        {this.props.orders.length !== 0 ? <h1>Your Orders</h1> : null}

        <div className={classes.orderWrapper}>{orders}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.prod.orders,
    user: state.prod.user,
    token: state.prod.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (user, token) => dispatch(actions.fetchOrders(user, token)),
    onUpdateProductRating: (product,id) => dispatch(actions.updateProductRating(product,id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
