import React, { useEffect, useState } from 'react';
import { useCookies, Cookies } from 'react-cookie';
import axios from 'axios';



function Login({ history }) {
    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['loginState']);


    async function TryLogIn() {
        const res = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/login`, { 'id': ID, 'password': PW })
        if (res.status === 200) {
            console.log(res)
            setCookie('loginState', true);
            setCookie('auth', res.data);
            // history.push("/");
            // window.location.reload();
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
                <input className="loginInput" type="password" onKeyDown={e => { if (e.key === "Enter") { TryLogIn() } }} onChange={e => setPW(e.target.value)} />
            </div>
            <button className="login_btn" onClick={e => TryLogIn()}>로그인</button>
        </div>
    )
}

export default Login;