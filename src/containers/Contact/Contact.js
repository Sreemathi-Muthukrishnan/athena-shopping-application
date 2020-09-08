import React, { Component } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import classes from "./Contact.module.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Auxiliary/Auxiliary";
class Contact extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Your Name",
        },
        value: "",
        message:'Please enter your name',
        label:"Customer Name",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Your Address",
        },
        value: "",
        message:'Please enter your address',
        label:"Customer Address",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      pinCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "PIN Code",
        },
        value: "",
        message:'Pincode should be six digits',
        label:"Pincode",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        message:'Please enter your country',
        label:"Country",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Your Mail Address",
        },
        value: "",
        message:'Please enter a valid email address',
        label:"Email Address",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      paymentMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "banking", displayValue: "Net Banking" },
            { value: "credit", displayValue: "Credit Card" },
            { value: "debit", displayValue: "Debit Card" },
          ],
        },
        value: "debit",
        message:'',
        valid: true,
        label:"Payment Method",
        validation: {},
      },
    },
    formIsValid: false,
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
    updatedFormElement.value,
    updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };
  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    let cartProducts =[];
    this.props.cart.forEach(product => {
      const inventory = product.inventory - product.quantity;
      cartProducts.push({
        id: product.productId,
        inventory:inventory,
      })
    });
    cartProducts.map(product => this.props.updateProduct(product,product.id));
    console.log(cartProducts);
    const order = {
      products: this.props.cart,
      price: this.props.price,
      orderData: formData,
      user:this.props.user,
    };
    this.props.onOrderPlaced(order,this.props.token);
    this.props.cart.map(product => this.props.onDeleteFromCart(product.id,this.props.token));
    this.props.history.push("/order-placed");
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            elementType={formElement.config.elementType}
            key={formElement.id}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            label={formElement.config.label}
            message={formElement.config.message}
          />
        ))}
        <Button
          style={{ width: "40px" }}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );
    let cartItems = this.props.cart.map((item, index) => (
      <div className={classes.cardContact} key={index}>
        <img src={item.img} alt="item-img" style={{ width: "100px" }} />
        <div className={classes.containerContact}>
          <h4>
            <b>{item.name}</b>
          </h4>
          <p>Price: {item.price}</p>
          <p>Quantity : {item.quantity}</p>
        </div>
      </div>
    ));
    return (
      <Aux>
        <div style={{ textAlign: "center", margin: "auto" }}>
          <h3 style={{ fontFamily: "Merienda, cursive", color: "#912a73" }}>
            Hope you enjoy your purchase with us!
          </h3>
          <h1>Order Total : INR {this.props.price}</h1>
          <div className={classes.cardContactWrapper}>{cartItems}</div>
        </div>
        <div className={classes.Contact}>
          <h3 style={{ color: "#912a73" }}>Enter Your Contact Details</h3>
          {form}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.prod.cart,
    price: state.prod.totalPrice,
    user:state.prod.user,
    token: state.prod.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderPlaced: (order,token) => dispatch(actions.orderPlaced(order,token)),
    onDeleteFromCart: (id,token) => dispatch(actions.deleteFromCart(id,token)),
    updateProduct:(product,id) => dispatch(actions.updateProductInventory(product,id))
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Contact)
);
