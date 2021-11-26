import React, { useEffect, useState } from 'react';
import { useCookies, Cookies } from 'react-cookie';

function Login({ history }) {
    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['loginState']);

    console.log(cookies.loginState)
    function checkLogin() {
        if (ID === process.env.REACT_APP_ADMIN_ID && PW === process.env.REACT_APP_ADMIN_PASSWORD) {
            setCookie('loginState', true);
            history.push("/");
            window.location.reload();
        } else {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.")
            setCookie('loginState', false);
        }
    }

    if (cookies.loginState === "true") {
        return (
            <div>이미 로그인 되어있습니다.</div>
        )
    } else return (
        <div className="loginDiv">
            <div className="login_field">
                <div className="loginText">아이디</div>
                <input className="loginInput" onChange={e => setID(e.target.value)} />
            </div>
            <div className="login_field">
                <div className="loginText">비밀번호</div>
                <input className="loginInput" onKeyDown={e => { if (e.key === "Enter") { checkLogin() } }} onChange={e => setPW(e.target.value)} />
            </div>
            <button className="login_btn" onClick={e => checkLogin()}>로그인</button>
        </div>
    )
}

export default Login;