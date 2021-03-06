import React from "react";
import {useParams} from "react-router-dom"
import ReactDOM from "react-dom";
import {Grid,Paper,Button,TextField} from '@material-ui/core/';


class ListComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:props.username,
            due_date:"",
            attachment:"",
            c_id:0,
            list_json:props.list_json,
            card_json:props.list_json.c_json,
            c_name:"",
            list_name:props.l_name,
            showPropName:""
        }
        //console.log(props.list_json)
        this.handleChange = this.handleChange.bind(this)
        this.AddCard = this.AddCard.bind(this)
        this.makeFetchPost = this.makeFetchPost.bind(this)
        this.DeleteCard = this.DeleteCard.bind(this)
        this.saveProps = this.saveProps.bind(this)
        //this.makeFetchDelete = this.makeFetchDelete(this)
    }

    
    DeleteCard(card){
        let newarr = this.state.card_json
        console.log(newarr,card.cardname)
        newarr = newarr.filter(el=>{
            return el.cardname != card.cardname
        })
        console.log(newarr)
        this.setState({card_json:newarr},()=>{
            let options = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    l_json:this.state.list_json,
                    c_name:card.cardname,
                    c_id:card.id,
                    b_name:this.props.b_name,
                    l_name:this.state.list_name,
                    c_json:this.state.card_json,
                    createdby:this.state.username}) // body data type must match "Content-Type" header
            }
            //console.log(this.state.b_name)
            fetch("https://aqueous-brushlands-30336.herokuapp.com/deletecard",options)
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
    makeFetchPost(l_name,toPerform){
        //console.log(l_name)
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                l_json:this.state.list_json,
                //[this.state.l_json.c_json]:this.state.card_json,
                l_name:l_name,
                b_name:this.props.b_name,
                c_json:this.state.card_json,
                date:date,createdby:this.state.username}) // body data type must match "Content-Type" header
        }
        //console.log(this.state.list_name)
        fetch("https://aqueous-brushlands-30336.herokuapp.com/"+toPerform+"card",options)
        .then(res => {
            console.log(options.body)
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

    }

    AddCard(l_name){
        if(this.state.c_name.length>0){
            this.setState({c_id:this.state.c_id+1})
            this.setState({card_json:[...this.state.card_json,{cardname:this.state.c_name,id:this.state.c_id+1}]},()=>{this.makeFetchPost(l_name,"create")})
            //this.setState({list_json:[...this.state.list_json]})
            this.setState({c_name:""})
        }
    }
    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }
    saveProps(l_name,c_name){
        //console.log(l_name)
        let newarr = this.state.card_json
        //console.log(newarr,c_name)
        newarr.forEach((el,index)=>{
            if(el.cardname === c_name){
                newarr[index].attachment = this.state.attachment
                newarr[index].due_date = this.state.due_date
            }
        })
        console.log(this.state.card_json)
        this.setState({card_json:newarr},this.makeFetchPost(l_name,"save"))
        
    }



    render(){
        
        let CardProps = (props)=>{
            
            console.log(props.showProp,props)
            if(props.showProp()){
                return(
                    < >                
                    <TextField
                    InputLabelProps={{
                        shrink: true,
                    }}
                            key="due"
                            variant="outlined"
                            margin="normal"
                            required
                            //defaultValue = {props.d_date}
                            value={this.state.due_date}
                            autoFocus
                            fullWidth
                            id="due_date"
                            type="date"
                            label="Due Date"
                            name="due_date"  
                            size="small"  
                            onChange={this.handleChange}
                        />
                        <TextField
                        key="attach1"
                        variant="outlined"
                        margin="normal"
                        //defaultValue = {props.attach}
                        value={this.state.attachment}
                        autoFocus   
                        size="small"
                        fullWidth
                        helperText="Enter Attachment"
                        id="attachment"
                        label="Attachment"
                        name="attachment"    
                        onChange={this.handleChange}
                    />
                    <Button onClick={()=>{this.saveProps(this.state.list_name,this.state.c_name)}} variant="contained" color="secondary">SAVE</Button>
                    </ >
                )
            }
            return <></>
        }

        let pb = []
        if(this.state.card_json==undefined){
            this.setState({card_json:[]},()=>{pb = this.state.card_json})
        }else{
            pb = this.state.card_json
        }
        return(
            <Grid container>
            {pb.map(item=>(
                <Grid item container 
                spacing={1}  

                direction="row"
                justify="center"
                alignItems="center"
                style={{backgroundColor:"#c3edea",marginBottom:"2%"}} 
                key={"list_" + item.id} >    
                            
                                        
            <Grid item xs={8}>
                {item.cardname}
            </Grid>
            <Grid item >
                <Button onClick={()=>{this.DeleteCard(item)}} variant="contained" color="secondary">
                    -
                </Button>    
            </Grid>             
                </Grid>
            ))}
            <Grid item container spacing={1}
                    
                    direction="row"
                    justify="center"
                    alignItems="center">
            <Grid item  >
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        autoFocus   
                        value={this.state.c_name}
                        fullWidth
                        id="c_name"
                        label="List Name"
                        size="medium"
                        name="c_name"    
                        onChange={this.handleChange}
                    />
            </Grid>
            <Grid item  >
                <Button onClick={()=>{this.AddCard(this.state.list_name)}} variant="contained" color="primary">
                    +
                </Button>
            </Grid>
            </Grid>
            </Grid>
        )
    }
}
export default ListComponent