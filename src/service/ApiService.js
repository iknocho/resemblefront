import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN="ACCESS_TOKEN";

export function call(api,method,request){
    let headers=new Headers({
        "Content-Type":"application/json"
    });
    //로컬 스토리지에서 ACCESS_TOKEN가져오기
    const accessToken=localStorage.getItem("ACCESS_TOKEN");
    if(accessToken &&accessToken !==null){
        headers.append("Authorization","Bearer "+accessToken);
    }

    

    let options={//header,method,(url),(body)
        headers:headers,
        url:API_BASE_URL+api,
        method:method,
    };

    console.log(options.url);
    console.log(options);

    if(request){//GET은 요청이 필요없을 듯?
        options.body=JSON.stringify(request);
    }
    return fetch(options.url,options)
        .then((response)=>    
        response.json().then((json)=>{
        console.log("정상작동");
        if(!response.ok){
            //response.ok 가 true면 정상적인 응답을 받은것이고 아니면 에러 응답을 받은것
            return Promise.reject(json);
        }
        return json;
    }) 
)
    .catch((error)=>{
        
        if(error.status===403){
            window.location.href="/login";//redirect
        }
        return Promise.reject(error);
    });
}

export function signin(userDTO){
    return call("/auth/signin","POST",userDTO)
    .then((json)=>{
        if(json.token){
            localStorage.setItem(ACCESS_TOKEN,json.token);
            window.location.href="/";
        }
    })
}

export function signout(){
    localStorage.setItem(ACCESS_TOKEN,null);
    window.location.href="/login";
}

export function signup(userDTO){
    return call("/auth/signup","POST",userDTO);
}