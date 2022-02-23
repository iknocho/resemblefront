import { TextField,Paper,Button,Grid } from "@material-ui/core";

import React, { Component } from 'react';

class AddTodo extends Component {
    constructor(props){
        super(props);
        this.state={item:{title:""}};
        this.add=props.add;//props함수를 this.add에 연결
        this.a={a:"2"};
    }
    
    //1.함수작성 텍스트필드에 적힌 글자를 텍스트 필드에 보여준다
    onInputChange=(e)=>{
        const thisItem=this.state.item;
        thisItem.title=e.target.value
        this.setState({item:thisItem});
        console.log(thisItem);
    }    
    onButtonClick=()=>{
        this.add(this.state.item);
        this.setState({item:{title:""}});//이부분이 없으면 id초기화가 안된다 왜그런지?????
    }
    enterKeyEventHandler=(e)=>{
        if(e.key==="Enter"){
            this.onButtonClick();
        }
    }

    render() {
        //2. 함수연결 TextField
        return (
            <Paper style={{margin: 16, padding:16}}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{paddingRight:16}}>
                        <TextField 
                        placeholder="Add Todo here" 
                        fullWidth
                        onChange={this.onInputChange}
                        value={this.state.item.title}
 
                        />

                    </Grid>
                    <Grid xs={1} md={1} item>
                         <Button 
                         fullWidth 
                         color="secondary" 
                         variant="outlined"
                         onClick={this.onButtonClick}
                         onKeyPress={this.enterKeyEventHandler}
                         >
                         
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
                
        );
    }
}

export default AddTodo;