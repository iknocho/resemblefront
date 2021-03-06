import React, { Component } from 'react';
import{ListItem,ListItemText,InputBase,Checkbox,ListItemSecondaryAction,IconButton}from "@material-ui/core"
import DeleteOutline from "@material-ui/icons/DeleteOutline"

class Todo extends Component {
    constructor(props){
        super(props);
        this.state={item:props.item, readOnly:true};
        this.delete=props.delete;
        this.update=props.update;
    }

    deleteEventHandler=()=>{
        this.delete(this.state.item);
    }

    offReadOnlyMode=()=>{
        console.log("Event!",this.state.readOnly);
        this.setState({readOnly:false},()=>{
            console.log("ReadOnly?",this.state.readOnly)
        })
    }

    enterKeyEventHandler=(e)=>{
        if(e.key==="Enter"){
            this.setState({readOnly:true},()=>{
                console.log("ReadOnly?",this.state.readOnly)
            });
            this.update(this.state.item);//엔터누르면 저장
        }
    }

    editEventHandler=(e)=>{
        const thisItem=this.state.item;
        thisItem.title=e.target.value;
        this.setState({item:thisItem})
    }

    checkboxEventHandler=(e)=>{
        const thisItem=this.state.item;
        thisItem.done= !thisItem.done;
        this.setState({item:thisItem});
        this.update(this.state.item);//체크박스 변경되면 저장
    }

    render() {
        const item =this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done} onChange={this.checkboxEventHandler}/>
                <ListItemText>
                    <InputBase
                        inputProps={{
                            "aria-label":"naked",
                            readOnly:this.state.readOnly,    
                    }}
                        type="text"
                        id={item.id} //각리스트의 구분을 위해서 id연결
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullwidth="true"
                        onClick={this.offReadOnlyMode}
                        onKeyPress={this.enterKeyEventHandler}
                        onChange={this.editEventHandler} //value값이 바뀔때
                        />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton 
                        aria-label="Delete Todo"
                        onClick={this.deleteEventHandler}>
                        <DeleteOutline/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            
        );
    }
}

export default Todo;