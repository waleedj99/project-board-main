import React from "react";
import {useParams} from "react-router-dom"
import ReactDOM from "react-dom";
import {Grid,Paper,Button,TextField} from '@material-ui/core/';

class CardComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showProp : false,
            due_date:"",
            attachment:""
        }
        this.saveProps = this.saveProps.bind(this)
    }

    render(){
        let CardProps = ()=>{
            if(this.state.showProp){
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
                    value={this.state.attachment}
                    autoFocus   
                    size="small"
                    fullWidth
                    id="attachment"
                    label="Attachment"
                    name="attachment"    
                    onChange={this.handleChange}
                />
                <Button onClick={()=>{this.saveProps(this.state.list_name,this.state.c_name)}} variant="contained" color="secondary">SAVE</Button>
                </ >
            )
            }
            return(<></>)
        }
    }
    
    
}