import React, {useState} from 'react';

function Login(props){

    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');

    return(
        <div className="loginDiv">
            <div className="login_field">
                <div className="loginText">아이디</div>
                <input className="loginInput" />
            </div>
            <div className="login_field">
                <div className="loginText">비밀번호</div>
                <input className="loginInput" />
            </div>
            <button className="login_btn">로그인</button>
        </div>
    )
}

export default Login;