import React , { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Navbar from  '../../components/Navbar/Navbar';
import classes from './Layout.module.css';
import Search from '../../containers/Search/Search';

class Layout extends Component {
    render(){
        return(
            <Aux>
                 <Navbar/> 
                 <Search/> 
                 <main className={classes.Content}>{this.props.children }</main>
            </Aux>
        );
    }
}

export default Layout;