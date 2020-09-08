import React from 'react';
import classes from './Input.module.css';

const Input =(props)=>{
    let inputElement = null;
    let validationError = null;
    const inputClasses=[classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        validationError=<p className={classes.InvalidMessage}>{props.message}</p>
    }
    switch(props.elementType){
        case('input'):
            inputElement = <input className={inputClasses.join(' ')}
             {...props.elementConfig} onChange={props.changed}  value={props.value}/>;
            break;
        case('textarea'):
            inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')}  {...props.elementConfig} 
            value={props.value}/>;
            break;
        case('select'):
        inputElement=(
            <select className={inputClasses.join(' ')}  onChange={props.changed} 
            value={props.value}>
                {props.elementConfig.options.map(option=>(
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}

            </select>
        );
        break;
        default:
            inputElement = <input className={classes.InputElement} onChange={props.changed}  {...props.elementConfig}
            value={props.value} />;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}
export default Input;