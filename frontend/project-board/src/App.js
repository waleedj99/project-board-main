import React from 'react';
import logo from './logo.svg';
import './App.css';
import BoardComponent from './components/BoardComponent'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import SignIn from './components/SignUp'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,Redirect
} from "react-router-dom";
import MyComponent from './components/MyComponent'

function App() {
  return (
    <Router>
    <div className="App">
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
            <Redirect to="/home"/>
          </Route>
          
        </Switch>
        
      
    </div>
    </Router>
  );
}

export default App;
