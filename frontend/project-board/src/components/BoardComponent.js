import React from "react";
import {useParams} from "react-router-dom"
import ReactDOM from "react-dom";
import {Grid,Paper,Button,TextField,Container} from '@material-ui/core/';
import ListComponent from "./ListComponent"
import HomePage from "./HomePage"


class BoardComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:props.username,
            c_id:0,
            l_name:"",
            toHome:false,
            list_json:this.props.board_json.l_json
        }
        this.AddList = this.AddList.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.DeleteList = this.DeleteList.bind(this)
        this.makeFetchPost = this.makeFetchPost.bind(this)
    }
    
    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    makeFetchPost(){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                b_name:this.props.board_json.name,
                l_json:this.state.list_json,
                date:date,createdby:"waleedj1699@gmail.com"}) // body data type must match "Content-Type" header
        }

        fetch("https://aqueous-brushlands-30336.herokuapp.com/createlist",options)
        .then(res => {
            console.log(options.body)
            res.json()})
        .then(
          (result) => {
            //window.location.reload(false)           
            console.log(result)
        },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )

    }  
      
    AddList(event){
        if(this.state.l_name.length>0){
        this.setState({c_id:this.state.c_id+1})
        this.setState({list_json:[...this.state.list_json,{listname:this.state.l_name,id:this.state.c_id+1}]},this.makeFetchPost)
        this.setState({l_name:""})    
    }}


    DeleteList(list){
        let newarr = this.state.list_json
        console.log(newarr,list.listname)
        newarr = newarr.filter(el=>{
            return el.listname != list.listname
        })
        console.log(newarr)
        this.setState({list_json:newarr}
        ,()=>{
            let options = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    b_name:this.props.board_json.name,
                    l_json:this.state.list_json,
                    createdby:this.state.username}) // body data type must match "Content-Type" header
            }
            //console.log(this.state.b_name)
            fetch("https://aqueous-brushlands-30336.herokuapp.com/deletelist",options)
            .then(res => {
                //console.log(options.body)
                res.json()})
            .then(
              (result) => {
                //window.location.reload(false)           
                //console.log(result)
            },
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            )
        })
    }

    render(){
        let pb = []
        // if(typeof(this.state.list_json)===typeof({})){
        //     this.setState({list_json:[this.state.list_json]})
        //     pb = this.state.list_json
        // }
        
        if(this.state.list_json==undefined){
            this.setState({list_json:[]},()=>{pb = this.state.list_json})
        }else{
            pb = this.state.list_json
        }
        if(this.state.toHome==true)
            return(<HomePage username={this.state.username}></HomePage>)
    return(
        <Grid style={{margin:"3em"}}container spacing={3}>
            
                <Button variant="outlined" onClick={(event)=>{this.setState({toHome:true})}}>Back</Button>
            
            
            <Grid item >
                <h1>{this.props.board_json.name}</h1>
            </Grid>
            <Grid spacing={3}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
            <Grid item xs={6} >
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        autoFocus   
                        value={this.state.l_name}
                        fullWidth
                        id="l_name"
                        label="List Name"
                        name="l_name"    
                        onChange={this.handleChange}
                    />
            </Grid>
            <Grid item xs={2} >
                <Button  onClick={this.AddList} variant="contained" color="primary">
                    Add List
                </Button>
            </Grid>
            </Grid>

            {
            pb.map(item=>(
                <React.Fragment>
                
                <Grid container key={item.id}   xs={4} offset={2} >
                    <Grid item  >
                    <Paper elevation={3} variant="elevation" style={{backgroundColor:"#f5f5f5"}}>
                        <h1>{item.listname}</h1>
                    
                   
                <ListComponent username={this.state.username} b_name = {this.props.board_json.name} l_name = {item.listname} list_json={item}/>
                                <Button style={{height:40,fontSize:10,width:10}} onClick={()=>{this.DeleteList(item)}} variant="contained" color="secondary">
                        Delete List
                    </Button>       
                    </Paper>
                    </Grid>
                    
                {/* {console.log(item)} */}
                </Grid>
                
                </React.Fragment>
            ))}
            
        </Grid>
    

        )
    }
}

export default BoardComponent