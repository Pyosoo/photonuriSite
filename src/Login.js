import React, {useState} from 'react';

function Login(props){

    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');

    function checkLogin(){
        console.log(process.env.ADMIN_ID)
        if(ID === process.env.ADMIN_ID && PW === process.env.ADMIN_PASSWORD){
            console.log("맞음")
        }else {
            console.log("틀림")
        }
    }

    return(
        <div className="loginDiv">
            <div className="login_field">
                <div className="loginText">아이디</div>
                <input className="loginInput" onChange={e => setID(e.target.value)}/>
            </div>
            <div className="login_field">
                <div className="loginText">비밀번호</div>
                <input className="loginInput" onChange={e => setPW(e.target.value)}/>
            </div>
            <button className="login_btn" onClick={e => checkLogin()}>로그인</button>
        </div>
    )
}

export default Login;