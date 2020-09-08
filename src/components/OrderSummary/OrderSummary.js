import React  from 'react';
import classes from './OrderSummary.module.css';

const OrderSummary =(props) => {
        return(
            <div className={classes.OrderSummary}>
                <h1>Your order has been placed successfully!</h1>
                <h3 style={{ color: '#912a73' }}>Thanks for shopping with us!</h3>
            </div>
        );
   
}

export default OrderSummary;