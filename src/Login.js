import React, { Component } from 'react';
import {signin} from './service/ApiService';
import Button from "@material-ui/core/Button";
import { Link,TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';

class Login extends Component {
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this)
    }



    handleSubmit(event){
        //form제출후 페이지 새로고침을 막는다
        event.preventDefault();    //form제출후 페이지 새로고침을 막는다
        //오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌
        const data= new FormData(event.target);
        
        const email=data.get("email");//field명 name을 가져온다
        const password= data.get("password");
        console.log("제출",data);
        signin({email:email,password:password});
    }


    render() {

        return (
            <Container component="main" maxWidth="xs" style={{marginTop:"8%"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            로그인
                        </Typography>
                    </Grid>
                </Grid>
                <form noValidate onSubmit={this.handleSubmit}>
                    {" "}
                    {/*submit버튼을 누르면 handleSubmit이 실행*/}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="emaili"
                                label="이메일 주소"
                                name="email"
                                autoComplete="email"
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="패스워드"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                로그인
                            </Button>
                        </Grid>
                        <Link href="/signup" variant="body2">
                            <Grid item>회원가입</Grid>
                        </Link>
                    </Grid>
                    
                </form>
            </Container>
           
        );
    }
}

export default Login;