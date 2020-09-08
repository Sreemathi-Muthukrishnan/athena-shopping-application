import React , { Component } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import classes from './LoginPage.module.css';
import axios from 'axios';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import * as actions from '../../store/actions/index';
class LoginPage extends Component {
    state={
        inputControls:{
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email Address'
                },
                value:'',
                message:'Please enter a valid email',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password: {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                message:'Password should be 8 characters minimum',
                validation:{
                    required:true,
                    minLength:8
                },
                valid:false,
                touched:false
            },
        },
        formIsValid: false,
        isSignup:true,
        error:null,
    };
    switchAuthModeHandler =()=>{
        this.setState(prevState =>{
          return {isSignup : !prevState.isSignup};
        })
    }
    loginHandler =  () =>{
        if(this.state.isSignup){
            axios.post(process.env.REACT_APP_BACKEND_URL+ '/users/signup',{
            email: this.state.inputControls.email.value,
            password: this.state.inputControls.password.value
        }).then(response =>{
            const userId = response.data.userId;
            const token = response.data.token;
            const tokenExpirationDate = this.props.expirationDate || new Date(new Date().getTime() + 1000*60*60);
            localStorage.setItem('userData',JSON.stringify({
                userId:userId,
                token:token, 
                expiration:tokenExpirationDate.toISOString()
            }));
            this.props.history.push('/');
            this.props.onLogin(userId,token, tokenExpirationDate);
        }).catch(err=>{
            this.setState({
                error: err.response.data.message ||'Something went wrong, please try again later!'
            });
            alert(this.state.error);
        })
        }else{
            axios.post(process.env.REACT_APP_BACKEND_URL + '/users/login',{
                email: this.state.inputControls.email.value,
                password: this.state.inputControls.password.value
            }).then(response =>{
                const userId = response.data.userId;
                const token = response.data.token;
                const tokenExpirationDate = this.props.expirationDate || new Date(new Date().getTime() + 1000*60*60);
                localStorage.setItem('userData',JSON.stringify({
                    userId:userId,
                    token:token, 
                    expiration:tokenExpirationDate.toISOString()
                }));
                this.props.history.push('/');
                this.props.onLogin(userId,token, tokenExpirationDate);  
            }).catch(err=>{
               
                this.setState({
                    error:  err.response.data.message || 'Something went wrong, please try again later!'
                });
                alert(this.state.error);
            })
        }
        
       
    }
    validateInput(value,rules){
        let isValid=true;
        if(rules.required){
            isValid= value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    changeHandler =(event,controlName) =>{
        const updatedControls= {
            ...this.state.inputControls,
            [controlName]:{
                ...this.state.inputControls[controlName],
                value:event.target.value,
                valid:this.validateInput(event.target.value,this.state.inputControls[controlName].validation),
                touched:true
            }
        };
        let formIsValid = true;
         for (let inputIdentifier in updatedControls) {
         formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
         }
        this.setState({
            inputControls:updatedControls,
            formIsValid: formIsValid,
        });
    }
    render(){
        const formElementsArray =[];
        for( let key in this.state.inputControls){
            formElementsArray.push({
                id:key,
                config: this.state.inputControls[key],
            });
        }
        let form =formElementsArray.map(formElement =>(
            <Input elementType={formElement.config.elementType}  key={formElement.id} 
            changed={(event)=>this.changeHandler(event,formElement.id)} 
            invalid={!formElement.config.valid} shouldValidate={formElement.config.validation}
            touched={formElement.config.touched} message={formElement.config.message}
            elementConfig={formElement.config.elementConfig} value={formElement.config.value} />
        ));
       
        return(
            <Aux>
            <h2 style={{ color:'#f54291'}}>Ready to elevate your makeup game? All you have to do is login and order your favourites!</h2>
            
            <div className={classes.LoginPage}>
                <span style={{color:'#912a73'}}><i className="fas fa-user fa-5x"></i> </span>
                <h3 style={{color:'#912a73'}}><strong>{this.state.isSignup ? 'Signup' : 'Login'} to Your Account</strong></h3>
                {form}
                <Button style={{width:'40px'}} clicked={this.loginHandler}
                disabled={!this.state.formIsValid}>
                {this.state.isSignup ? 'Signup' : 'Login'}</Button>
                <div style={{textAlign:'center'}}>
                    <button className={classes.LoginButton} onClick={this.switchAuthModeHandler}>
                    Switch to {this.state.isSignup ? 'Login' : 'Signup'}</button>
                </div>
            </div>
            </Aux>
        );
    }
}
const mapStateToProps =state =>{
    return{
        login: state.prod.login,
        expirationDate: state.prod.expirationDate
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onLogin:(userId,token, expirationDate) => dispatch(actions.userLogin(userId,token, expirationDate)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);