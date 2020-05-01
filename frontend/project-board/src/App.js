import React from 'react';
import logo from './logo.svg';
import './App.css';
import BoardComponent from './components/BoardComponent'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import {AppBar,Icon,IconButton,Typography,Toolbar} from "@material-ui/core";

import SignIn from './components/SignUp'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,Redirect
} from "react-router-dom";
import MyComponent from './components/MyComponent'

function App() {
  return (
    <Router>
    <div className="App">
    <AppBar position="static">
          <Toolbar>
            
            <Typography variant="h6" >
              Project Board
            </Typography>
            <IconButton edge="end" color="inherit" aria-label="menu">
            
            </IconButton>

            
          </Toolbar>
        </AppBar>
      <br></br>
    <Switch>
          <Route path="/signup">
            <SignIn/>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/board">
            <BoardComponent />
          </Route>
          <Route path="">
            <Redirect to="/login"/>
          </Route>
          
        </Switch>
        
      
    </div>
    </Router>
  );
}

export default App;
