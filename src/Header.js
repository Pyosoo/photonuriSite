import React, {useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import {useHistory} from 'react-router-dom'

function Header(props) {
    const cookies = new Cookies();
    const history = useHistory();
    useEffect(()=>{

    }, [cookies.loginState])
    return (
        <div className="header">
            <div className="header_login">
            {
                    cookies.get('loginState') === 'true' ? 
                    <>
                        <button  onClick={e => {
                            cookies.set('loginState', false)
                            window.location.reload();
                        }}>로그아웃</button>
                        <button onClick={e => {
                            history.push("/admin")
                        }}>
                            수정페이지
                        </button>
                        <button onClick={e => {
                            history.push('/')
                        }}>
                            홈으로
                        </button>
                    </>
                    :
                    <button onClick={e => {
                        history.push("/login");
                    }}>로그인</button>
                }
            </div>
            <p className="header_t1">Photonuri.com</p>
            <p className="header_t2">The Country of Morning Calm Traditional Architecture Of Korea Stock Photo Archive.</p>
            <p className="header_t2">Seoul, South Korea</p>
        </div>
    )
}

export default Header;