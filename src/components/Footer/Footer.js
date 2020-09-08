import React from 'react';
import classes from './Footer.module.css';
const Footer =(props) =>{
    return(
        <div className={classes.Footer}>
          
          <div className={classes.Center}>
          <h3 className={classes.ContactHeading}>Contact Us</h3>
          <p><strong>CUSTOMER SERVICES</strong></p>
          <p>Email: support@athena.com</p>
          <p><i className="fas fa-phone-alt"></i> FOR ANY HELP CALL US AT</p>
          <p><strong>+91 987654321</strong></p>
          <p>Show us some love on social media!</p>   
          <p><i className="fab fa-instagram"></i> <i className="fab fa-facebook-square"></i> <i className="fab fa-pinterest"></i> <i className="fab fa-youtube-square"></i> <i className="fab fa-twitter"></i></p>
          <p className={classes.Copyright}>
          © Copyright 2020 Athena. All rights reserved.
          </p>
          </div>
          
        </div>
        
    );
}

export default Footer;