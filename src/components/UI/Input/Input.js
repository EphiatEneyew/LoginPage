import React from "react";
import classes from './Input.module.css';
const Input = (props) =>{
    return  <div
    className={`${classes.control} ${
      props.IsValid === false ? classes.invalid : ''
    }`}
  >
    <label htmlFor={props.id}>{props.label}</label>
    <input
      type={props.type}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onblure}
    />
  </div>
};
export default Input;