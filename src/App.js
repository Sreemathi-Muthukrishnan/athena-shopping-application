import React, { Component, Suspense } from "react";
import Layout from "../src/hoc/Layout/Layout";
import LoginPage from "./containers/LoginPage/LoginPage";
import Home from "./containers/Home/Home";
// import ProductDescription from "./containers/ProductDescription/ProductDescription";
// import Contact from './containers/Contact/Contact';
import CartProducts from './containers/CartProducts/CartProducts';
import Spinner from './components/Spinner/Spinner';
import { Route, Switch, Redirect, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Logout from "./containers/Logout/Logout";
// import Checkout from "./containers/Checkout/Checkout";
// import OrderSummary from "./components/OrderSummary/OrderSummary";
import Orders from "./containers/Orders/Orders";
import Athena from "./containers/Athena/Athena";

const Contact = React.lazy(() => import('./containers/Contact/Contact'));
const OrderSummary = React.lazy(() => import("./components/OrderSummary/OrderSummary"));
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const ProductDescription = React.lazy(() => import("./containers/ProductDescription/ProductDescription"));

class App extends Component {
  componentDidMount(){
      this.props.onAuthenticated();
  }
  render(){
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/cart" component={CartProducts}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/product-description/:name"  render ={() => (
              <Suspense fallback={<div><Spinner/></div>}>
                <ProductDescription/>
              </Suspense>
            )}/>
            <Route path="/checkout"  render ={() => (
              <Suspense fallback={<div><Spinner/></div>}>
                <Checkout/>
              </Suspense>
            )}/>
            <Route path="/contact-data" render ={() => (
              <Suspense fallback={<div><Spinner/></div>}>
                <Contact/>
              </Suspense>
            )}/>
            <Route path="/order-placed" render ={() => (
              <Suspense fallback={<div><Spinner/></div>}>
               <OrderSummary/>
              </Suspense>
            )}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/athena" component={Home}/>
            <Route path="/" exact component={Athena} />
            <Redirect to="/"></Redirect>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated : state.login,
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    onAuthenticated: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
