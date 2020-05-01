import React from "react";
import ReactDOM from "react-dom";
import {Redirect,Route, NavLink} from "react-router-dom"
import {Grid,Link,Button,TextField,Container,AppBar,Icon,IconButton,Typography,Toolbar} from "@material-ui/core";

class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLoaded:undefined,
            userEmail:"",
            userPass:"",
            errorM:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(event) {
        let options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(this.state) // body data type must match "Content-Type" header
        }
        fetch("https://aqueous-brushlands-30336.herokuapp.com/login",options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: result.message,
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
        event.preventDefault();
      }
    render(){
      let ErrorMessage=()=>{
        if(this.state.isLoaded == false)
          return <h1>Unable to login</h1>
        return(<> </>)
      }   

      if (this.state.isLoaded !== undefined) {
        if(this.state.isLoaded)
          return <Redirect to={{
            pathname: '/home',
            state: { username: this.state.userEmail }
        }} />
      }
  
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
                onChange={this.handleChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="userPass"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick ={this.handleSubmit}
            >
                Sign In
            </Button>

            <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
                <ErrorMessage/>
            </Grid>
        </form>
        </Container>
        </>
  
  );}
}
export default LoginPage