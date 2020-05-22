import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;

    switch (props.inputtype) {
        case('input'):
            inputElement = <input {...props} className={classes.InputElement} value={props.value}  onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea {...props} className={classes.InputElement} value={props.value}  onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
            <select 
                className={classes.InputElement} 
                value={props.value} onChange={props.changed}>
                {props.options.map(option => (
                    <option value={option.value} key={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>);
            break;
        default:
            inputElement = <input {...props} className={classes.InputElement} value={props.value} onChange={props.changed}/>;
    }

    return (

        <div className={props.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;