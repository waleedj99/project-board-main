import React from "react";
import ReactDOM from "react-dom";
import {Redirect,Route} from "react-router-dom"
import {Grid,TextField,Paper,Button,Modal, Container} from '@material-ui/core/';
import BoardComponent from './BoardComponent'
import { blue } from "@material-ui/core/colors";

class HomePage extends  React.Component{
    constructor(props){
        super(props)
        this.state={
            username:"waleedj1699@gmail.com",//props.location.state.username,
            projectBoards:[],
            createFormState:false,
            b_name:"",
            toBoard:false,
            board_json:[{l_json:[]}]
        }
        this.deleteBoard = this.deleteBoard.bind(this)
        this.handleChange = this.handleChange.bind(this) 
        this.createBoard = this.createBoard.bind(this)
        //console.log(this.props.location.state.email)
    }

    deleteBoard(b_name){
      let options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({name:b_name,createdby:"waleedj1699@gmail.com"}) // body data type must match "Content-Type" header
    }
    fetch("https://aqueous-brushlands-30336.herokuapp.com/deleteboard",options)
    .then(res => {
        console.log("Created")
        res.json()})
    .then(
      (result) => {
        window.location.reload(false)           
        console.log("Created")
        
    },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
    }
    handleChange(event){
        console.log(event.target.value)
        this.setState({[event.target.name]: event.target.value});
    }
    createBoard(b_name){	
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({name:b_name,date:date,createdby:"waleedj1699@gmail.com"}) // body data type must match "Content-Type" header
        }
        fetch("https://aqueous-brushlands-30336.herokuapp.com/createboard",options)
        .then(res => {
            console.log("Created")
            res.json()})
        .then(
          (result) => {
            window.location.reload(false)           
            console.log("Created")
            
        },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
        
    }
    componentDidMount(){
      let options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({createdby:this.state.username}) // body data type must match "Content-Type" header
    }
    fetch("https://aqueous-brushlands-30336.herokuapp.com/home",options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            projectBoards: result,
          },()=>{
            console.log(this.state.projectBoards)
          });
          console.log(this.state)
        },
        (error) => {
          this.setState({
            isLoaded: true
          });
        })
    }
    
    render(){
        if (this.state.toBoard === true){ 
            return (<BoardComponent board_name={this.state.b_name}board_json={this.state.board_json}/>)}
        let CreateForm = (props)=>{
            //console.log(props.state)
            if(props.state.createFormState){
                return (
                <Grid
                spacing={3}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                <Grid item xs={6} >
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        autoFocus   
                        value={this.state.b_name}
                        fullWidth
                        id="b_name"
                        label="Board Name"
                        name="b_name"    
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item >
                <Button onClick={(event)=>{
                    this.createBoard(props.state.b_name)
                }} 
                variant="contained" color="primary">
                    Create
                </Button>
                </Grid >
                <Grid item >
                <Button onClick={(event)=>{
                    
                    this.setState({createFormState:false})
                    console.log(this.state)}} variant="contained" color="secondary">
                    Cancel
                </Button>
                </Grid>
                </Grid>
                )
            }
            return(
            <Button onClick={(event)=>{this.setState({createFormState:true})}} variant="contained" color="primary">
            Create
            </Button>)
        
        }
        const pb = this.state.projectBoards;
        return(
          <Container>
            <Grid  container spacing={3} >   
                <Grid item xs={12}>
                            
                <CreateForm state = {this.state}/>
                </Grid>

                
                    {pb.map(item=>(
                        <Grid key={item._id} item xs={4} offset={2}>
                        <Paper elevation={3} variant="elevation" style={{height:50,backgroundColor:"#f5f5f5"}}><h1>{item.name}</h1></Paper>
                        <Paper >Create On:{item.date}</Paper>
                        <Paper >
                        <Button style={{marginLeft:'5%'}} variant="contained"
                color="primary" onClick={(event)=>{this.setState({toBoard:true,board_json:item})}}>OPEN</Button>
                        <Button style={{marginLeft:'5%'}} variant="contained"
                color="secondary" onClick={()=>{this.deleteBoard(item.name)}}>DELETE</Button>
                        </Paper>
                        </Grid>
                        
                    ))}
                    
            </Grid>
            </Container>
            //<BoardComponent board_json = {this.project}/>
        );
    }

}

export default HomePage