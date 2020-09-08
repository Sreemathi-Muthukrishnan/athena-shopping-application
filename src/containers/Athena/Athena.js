import React, { Component } from "react";
import classes from "./Athena.module.css";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Carousel from "../Carousel/Carousel";
import Footer from '../../components/Footer/Footer';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ProductGallery from "../ProductGallery/ProductGallery";
class Athena extends Component {
  componentDidMount() {
    this.props.onFetchProducts();
    this.props.onClearAll();
  }
  carouselHandler =()=>{
      this.props.history.push('/athena');
  }
  productHandler =(filter)=>{
    this.props.onAddRemoveFilter(filter);
    this.props.history.push('/athena');
  }
  render() {
    const Products = [
        {
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcScMLmOhFbiUNM0vdHGsaMv5PSATLto3ZKKlg&usqp=CAU",
            title:"The Eye Beauty Guide",
            description:"All Eyes On You Girl!",
            type:"eyes"
        },
        {
            img:"https://static.standard.co.uk/s3fs-public/thumbnails/image/2019/07/24/15/charlotte-tilbury-hot-lips-collection..jpg?w968",
            title:"Ready, Set, Slay",
            description:"Hottest Shades of Lipsticks of All Time",
            type:"lips",
        },
        {
            img:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/iconic-nail-polish-1551297115.jpg?crop=0.502xw:1.00xh;0.298xw,0&resize=640:*",
            title:"The Nail Edit",
            description:"Your Ultimate Guide For Poppin' Tips" ,
            type:"nails"
        },
        {
            img:"https://3.bp.blogspot.com/-Yw3Oon7as9M/XB5NJP7LPrI/AAAAAAAAAFw/KfVVN4oGgiAfcgYmHSZsdi8bI-7prybkwCLcBGAs/s1600/makeup.jpg",
            title:"Visible Pores, No More",
            description:"Happy Self Grooming",
            type:"face"
        },
    ];
    return (
      <Aux>
        <div className={classes.Athena}>
          <h1>Big Pink Flash Sale is On! Shop Now!</h1>
          <div className={classes.Carousel} onClick={this.carouselHandler}>
            <Carousel />
          </div>
          <div className={classes.Spotlight}>
            <h1>In the Spotlight</h1>
          </div>
          <div className={classes.row}>
            {Products.map((product,index) =>(
                <div key={index} onClick={()=>this.productHandler(product.type)} >
                <ProductGallery img={product.img} title={product.title} description={product.description} />
           </div>
            ))}
            
          </div>
          <Footer/>
          
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.prod.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.fetchProducts()),
    onAddRemoveFilter: (filter) => dispatch(actions.addRemoveFromFilter(filter)),
    onClearAll: () => dispatch(actions.clearAll()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Athena);
