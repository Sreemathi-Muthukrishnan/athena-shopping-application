import React, { Component } from "react";
import classes from "./ProductGallery.module.css";
import Aux from "../../hoc/Auxiliary/Auxiliary";
class ProductGallery extends Component {
  render() {
    return (
      <Aux>
        <div className={classes.cardGallery}>
          <img
            src={this.props.img}
            alt="Product"
            style={{ width: "100%", height: "200px" }}
          />
          <p className={classes.title}>{this.props.title}</p>
          <p>{this.props.description}</p>
          <p>
            <button className={classes.ProductGallerybutton}>Shop Now</button>
          </p>
        </div>
      </Aux>
    );
  }
}

export default ProductGallery;
