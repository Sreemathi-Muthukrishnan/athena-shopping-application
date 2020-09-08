import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import  classes  from './Carousel.module.css';
class Carousel extends Component {
    render(){
        let responsive = {
            0: { items: 1 },
            1024: { items: 1 },
          }
        let Images = ["https://assets.gadgets360cdn.com/pricee/assets/category/202006/og-banner-maybelline-1200x628_1591353201.jpg",
        "https://timeforsocialjustice.files.wordpress.com/2014/03/ponds-white-beauty-face-wash-poster.jpg",
        "https://www.brandsynario.com/wp-content/uploads/Loreal-lead.jpg",
        "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/2/2017/11/07192052/HudaBeauty.jpg",
        "https://www.yeswecoupon.com/wp-content/uploads/2016/11/mac.jpg",
        ]
        return(
            <Aux>
                <AliceCarousel autoPlay autoPlayInterval={3000} responsive={responsive} buttonsDisabled={true}>
                <img src={Images[0]} className={classes.sliderimg} alt=""/>
                <img src={Images[1]} className={classes.sliderimg} alt=""/>
                <img src={Images[2]} className={classes.sliderimg} alt=""/>
                <img src={Images[3]}className={classes.sliderimg}alt=""/>
            </AliceCarousel>
            </Aux>
        )
    }

}

const mapStateToProps = state =>{
    return{
      products: state.prod.products,
    }
  }
export default connect(mapStateToProps)(Carousel);