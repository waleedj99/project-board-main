import React from "react";
import ReactDOM from "react-dom";
import {Redirect,Route, NavLink} from "react-router-dom"
import {Grid,Link,Button,TextField,Container,AppBar,Icon,IconButton,Typography,Toolbar} from "@material-ui/core";

let ValidationErrorComp = (props)=>{
  if(props.validationError)
  return(<div><h1>The Email format was incorrect or the passwords were not matching </h1></div>)
else
  return(<div></div>)
}


class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userEmail:"",
            userPass:"",
            c_userPass:"",
            errorPassText:"Enter Passowrd with ..",
            errorCPassText:"Passwords dont match",
            errorEmailText:"Incorrect Email Format",
            errorEmailSate:false,
            errorPassState:false,
            errorCPassState:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(event) {
      event.preventDefault();
      var regexEmail = /\S+@\S+\.\S+/
      var regexPassword = /\S+/
      if(regexEmail.test(this.state.userEmail) &&regexPassword.test(this.state.userEmail) &&this.state.userPass==this.state.c_userPass){
        let options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(this.state) // body data type must match "Content-Type" header
        }
        fetch("https://aqueous-brushlands-30336.herokuapp.com/signup",options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )    
      }
      else{
        this.setState({validationError:true})
      }
    }
    render(){
        return (
          <>
          
        <Container component="main" maxWidth="xs">
        <form>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                
                id="email"
                label="Email Address"
                name="userEmail"
                autoComplete="email"
                autoFocus
                helperText = {this.state.errorEmailText}
                error = {this.state.errorEmailState}
                onChange={(event)=>{
                  this.handleChange(event)
                  var re = /\S+@\S+\.\S+/
                  this.setState({errorEmailState:!re.test(event.target.value)})
                }}
                  
            />
            
            <TextField
                helperText= {this.state.errorPassText}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="userPass"
                label="Password"
                type="password"
                id="password"
                error ={this.state.errorPassState}
                autoComplete="current-password"
                onChange={(event)=>{
                  this.handleChange(event)
                  var re=/\S+/
                  this.setState({errorPassState:!re.test(event.target.value)})
                }}
            />
            <TextField
                error = {this.state.errorCPassState}
                helperText= {this.state.errorCPassText}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="c_userPass"
                label="Confirm Password"
                type="password"
                id="c_password"
                autoComplete="current-password"
                onChange={(event)=>{
                  this.handleChange(event)
                  
                  this.setState({errorCPassState:(this.state.userPass!=event.target.value)})
                }}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick ={this.handleSubmit}
            >
                Sign Up
            </Button>
            <Link href="/login" variant="body2">
                    {"Already have an account? Login"}
                </Link>
        </form>
        <ValidationErrorComp validationError={this.state.validationError}/>
        </Container>
          </>      
  );}
}

export default SignUp