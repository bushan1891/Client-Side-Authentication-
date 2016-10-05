import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER , AUTH_ERROR , UNAUTH_USER} from './types';
const ROOT_URL = 'http://localhost:3090';


export function signinUser({email,password}){
return function(dispatch){
    // using redux thunk gives us access to dispatch

//{email,password} is same as {email:email , password :password} es6 feature
    //submit password to server
    axios.post(`${ROOT_URL}/signin`,{email,password}).then(response => {

      // update state to indicate user is authenticated
      dispatch({type:AUTH_USER});

      // save jwt token
      localStorage.setItem('token',response.data.token);
      // redirect  to /feature using react-router
      browserHistory.push('/feature');

    }).catch(error =>{
        dispatch(authError('Bad Login info'));
    })

}
}

export function signupUser({email,password}){
return function(dispatch){
  axios.post(`${ROOT_URL}/signup`,{email,password})
  .then(response =>{
    dispatch({type:AUTH_USER});

    localStorage.setItem('token',response.data.token);

    browserHistory.push('/feature');

  })
  .catch(response=>{
    dispatch(authError('Error in creating user'))
  });
  
}
}

export function fetchMessage(){
  return function(dispatch){
    axios.get(ROOT_URL,{headers:{Authorization:localStorage.getItem('token')}})
    .then(response => {
      console.log(response);
    });
    }
  }


export function authError(error){
  return {
    type: AUTH_ERROR,
    paylaod:error
  }
}

export function signoutUser(){
localStorage.removeItem('token');

  return{
    type:UNAUTH_USER
  }
}
