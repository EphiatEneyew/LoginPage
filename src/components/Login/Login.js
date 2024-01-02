import React, { useState, useEffect, useReducer, useContext} from 'react';
import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state,action) =>{
  if(action.type==='USER-INPUT'){
    return{value:action.val, isValid:action.val.includes('@')}
  }
  if(action.type==='INPUT-BLURE'){
    return{value:state.value, isValid:state.value.includes('@')}
  }

  return {value: '', isValid: null};
}

const passwordReducer = (state, action) =>{
  if(action.type==='USER-INPUT'){
    return {value: action.val, isValid:action.val.trim().length > 6 }

  }
  if(action.type==='INPUT-BLURE'){
    return{value:state.value, isValid:state.value.trim().length > 6 }
  }
  return {value:'', isValid: null};
}
const Login = () => {
 
 // const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] =useReducer(passwordReducer, {value: '', isValid: null})

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);
  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

    useEffect(() => {
     const identifier = setTimeout(() => {
       console.log('Checking form validity!');
       setFormIsValid(
        emailIsValid && passwordIsValid
       );
     }, 500);

     return () => {
       console.log('CLEANUP');
       clearTimeout(identifier);
     };
   }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER-INPUT', val:event.target.value})

   // setFormIsValid(
  //    emailState.isValid && passwordState.isValid
    //);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER-INPUT', val:event.target.value})

   // setFormIsValid(
     // emailState.isValid && passwordState.isValid
    //);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT-BLURE'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT-BLURE'})
   
  };
  const autcxt = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    autcxt.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
            type="email"
            label="E-mail"
            id="email"
            isValid={emailIsValid}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          /> 
          <Input 
          type="password"
          label="Password"
          id="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
