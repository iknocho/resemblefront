import logo from './logo.svg';
import React, { Component } from "react";
import { Paper,List,Container,Grid,Button,AppBar,Toolbar,Typography } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { call,signout } from './service/ApiService';
import Loading from './Loading';

class App extends Component {
  constructor(props){
    super(props);
    //item->item배열로  초기 items에는 title이없는데 Todo.js로 넘길때 오류가 안나는 이유???
    this.state={
      items:[ ],
      loading:true
    };
    this.a={a:"1"};
  }

  componentDidMount(){//마운팅이 끝나고 바로 실행되는 함수
    //todoList를 렌더링 되자마자 리스트로 보여주기 위해서
   call("/todo","GET",null)
   .then((json)=>this.setState({items:json.data,loading:false})
   );
  }
  
  add=(item)=>{
    /* const requestOptions={
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(item)
    };
    fetch('http://localhost:8080/todo',requestOptions)
    .then(response=>response.json())
    .then(json=>this.setState({items:json.data})//todolist초기화
    ); */
    call("/todo","POST",item)
    .then(json=>this.setState({items:json.data}))
  }
  
  delete=(item)=>{
    call("/todo","DELETE",item)
   .then((json)=>this.setState({items:json.data})
   );
  };

  update=(item)=>{
    call("/todo","PUT",item)
    .then((response)=>this.setState({items:response.data})
    );
  }

    /* const requestOptions={
      method:"GET",
      headers:{"Content-Type":"application/json"},
    };

    fetch("http://localhost:8080/todo",requestOptions)
    .then((response)=>response.json())
    .then(
      (response)=>{
        this.setState({items:response.data,
        });
      },
      (error)=>{
        this.setState({
          error,
        })
      }
    )  
   */
    /* function exampleFunction(){
      return new Promise((resolve,reject)=>{
        var oReq=new XMLHttpRequest();
        oReq.open("GET","http://localhost:8080/todo");
        oReq.onload=function(){
          resolve(oReq.response);//resolve상태
        };
        oReq.onerror=function(){
          reject(oReq.response);//Reject상태
        }
        oReq.send();//Pending상태
      });
    }
    exampleFunction()
    .then((r)=>console.log("Resolved"+r))
    .catch((e)=>console.log("Rejected"+e)); */
  
  
  //+버튼을 눌러 addtodo에 적혀있는 아이템을 app 컴포넌트 item변수에 저장 
  //app에서 실행됨 AddTodo에서 실행 x
  /* add=(item)=>{
    const thisItems=this.state.items;
    item.id="ID-"+thisItems.length//key를 위한 id추가
    console.log(item.id);
    item.done=false;
    thisItems.push(item);//리스트에 아이템추가
    this.setState({items:thisItems});//**업데이트는 this.setState를 사용해야함
    console.log("items:",this.state.items);
    console.log(this.a.a);
  }

  delete=(item)=>{//함수를 하위 컴포넌트에 넘겨줬을 경우, item=하위컴포넌트에서 넘어온 매개변수 
    const thisItems=this.state.items;
    const newItems=thisItems.filter(e=>e.id!==item.id);
    this.setState({items:newItems},()=>{
      //디버깅 콜백 콜백과 vs 콜백아닐떄의 차이???????
      console.log("U[date Items:",this.state.items)
    });
    console.log("Update Items nocollback:",this.state.items)
  } */

  


  render() {
        //2.자바스크립트가 제공하는 map 함수를 이용해 배열을 반복해<Todo.../> 컴포넌트 생성
        var todoItems = this.state.items.length>0&&(
          <Paper style={{margine:16}}>
            <List>
              {this.state.items.map((item,idx)=>(
                <Todo 
                item={item} 
                key={item.id} 
                delete={this.delete}
                update={this.update}
                />
              ))}
            </List>
          </Paper>
        );

        var navigationBar=(
        <AppBar position="static">
          <Toolbar>
            <Grid justify="space-between" container>
              <Grid item>
                <Typography variant="h6">TODO</Typography>
              </Grid>
              <Button color="inherit" onClick={signout}>
                Logout
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
        )
        var todoListPage=(
          <div className="App">
              {navigationBar}
              <Container maxWidth="md">
                <AddTodo add={this.add}/>
                <div className="TodoList">{todoItems}</div>
              </Container>
            </div>
            );
        var loading=<Loading/>
        var content =loading;
        if(!this.state.loading){
          content=todoListPage;
        }
          //3. 생성된 컴포넌트 리턴
          return (
            <div className="App">{content}</div>
          );
  }
}

export default App;