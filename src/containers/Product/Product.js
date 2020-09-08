import React, { Component } from "react";
import classes from "./Product.module.css";
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Spinner from '../../components/Spinner/Spinner';

class Product extends Component {
  productLoad =(id,name) =>{ 
    this.props.onProductClick(id);
    this.props.history.push('/product-description/'+name)
  }
  render() {
    return (
      <div className={classes.Product}  onClick={()=> this.productLoad(this.props.id,this.props.name)}>
        <LazyLoad placeholder={<Spinner/>} height={100} offset={[-100,100]}>
        <img src={this.props.img} alt="Matte Lipstick" style={{ width: "100%" }} />
        </LazyLoad> 
        <h2>{this.props.name}</h2>
        <p className={classes.price}>INR {this.props.price}</p>
        {/* {this.props.rater !== 0 && <p className={classes.price} >{this.props.rating}<span style={{color:'#FDCC0D'}} className="fa fa-star checked"></span></p>} */}
        {this.props.inventory === 0 && <p className ={classes.outOfStock}> OUT OF STOCK! </p>}
        {this.props.inventory !== 0 && <p style={{ color:' #f54291',fontFamily:'Merienda, cursive'}}>{this.props.description}</p>}
        {this.props.rater !==0 && <p className={classes.price}>{this.props.rating} <span style={{color:'#FDCC0D'}} className="fa fa-star checked"></span></p>} 
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>{
  return{
     onProductClick :(id) => dispatch(actions.productDescription(id)),
  }
}
export default withRouter(connect(null,mapDispatchToProps)(Product));
