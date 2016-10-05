import React ,{Component } from 'react';
import {reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignUp extends Component {
	
	handleFormSubmit(formProps){
		this.props.signupUser(formProps);
	}
renderAlert(){
	if(this.props.errorMessage){
		return (
		<div className="alert alert-danger">
		<strong>Oops ! </strong>{this.props.errorMessage}</div>
			)
	}
}

	render(){
		const {handleSubmit, fields:{email,password,passwordConfirm} }=this.props;
		return(
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
			<fieldset className="form-group">
			<lable>Email:</lable>
			{email.touched && email.error&& <div class="error">Email Error</div>}
			<input className="form-control" {...email}/>
			</fieldset>
			<fieldset className="form-group">
			<lable>Password:</lable>
			<input type ="password"className="form-control" {...password}/>
			{password.touched&&password.error&& <div className="error">Password does not match</div> }
			</fieldset>
			<fieldset className="form-group">
			<lable>ConfirmPassword:</lable>
			<input type="password" className="form-control" {...passwordConfirm}/>
			{passwordConfirm.touched&&passwordConfirm.error&& <div className="error">Password does not match</div> }
			</fieldset>
			{this.renderAlert()}
			<button action="submit" className="btn btn-primary">SignUp</button>
			</form>
			)
	}

}
function validate(formProps){
	const error={}
	 
	if(!formProps.email){
		error.email="please enter an email";
	}
	if(!formProps.password){
		error.password ="please enter a password confirmation";
	}
	if(!formProps.passwordConfirm){
		error.password ="please enter a password confirmation";
	}

	 if(formProps.password != formProps.passwordConfirm ){
	 	error.password = "Password must match"
	 }

	return error;
}

function mapStateToProps(state){
	return {errorMessage : state.auth.error}
}

export default reduxForm({
form:'signup',
fields:['email','password','passwordConfirm'],
validate:validate
},mapStateToProps,actions)(SignUp);