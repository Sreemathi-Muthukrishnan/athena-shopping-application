import React from 'react';
import classes from './Logo.module.css';
import athenaLogo from '../../assests/images/athena-logo.png';
const Logo =(props) => {
        return(
        <div className={classes.Logo}>
            <img src={athenaLogo} alt="Athena"/>
        </div>
        );
}

export default Logo;