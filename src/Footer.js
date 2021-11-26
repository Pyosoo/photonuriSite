import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';
import {useHistory} from 'react-router-dom'


function Footer() {
    const cookies = new Cookies();
    const history = useHistory();
    useEffect(()=>{

    }, [cookies.loginState])
    return (
        <div className="footer">
            <p className="footer_t">How can I buy stock photo ?</p>
            <p className="footer_t">Where can I buy stock photo ?</p>

            <div className="footer_mid">
                <div className="footer_part">
                    <div className="footer_item">
                        <a className="footer_item_link" href="http://www.shutterstock.com/g/ALNET?rid=205302337">
                            <img src="http://www.photonuri.com/wp-content/uploads/2020/11/stock-photo-kiev-ukraine-february1.jpg" />
                        </a>
                        <p className="footer_item_p">Shutterstock</p>
                        <p className="footer_item_p">www.shutterstock.com</p>
                        <a className="footer_item_a">VIEW DETAILS</a>
                    </div>
                </div>
                <div className="footer_part">
                    <div className="footer_item">
                        <a className="footer_item_link" href="https://stock.adobe.com/kr/contributor/207850314/syston">
                            <img src="http://www.photonuri.com/wp-content/uploads/2020/11/AdobeStock_292263265_Preview_Editorial_Use_Only.jpeg" />
                        </a>
                        <p className="footer_item_p">Adobe Stock</p>
                        <p className="footer_item_p">stock.adobe.com</p>
                        <a className="footer_item_a">VIEW DETAILS</a>
                    </div>
                </div>
                <div className="footer_part_last">
                    <div className="footer_item">
                        <a className="footer_item_link" href="https://www.istockphoto.com/kr/portfolio/syston?assettype=image&sort=mostpopular">
                            <img src="http://www.photonuri.com/wp-content/uploads/2020/11/istockphoto-472137495-1024x1024-1.jpg" />
                        </a>
                        <p className="footer_item_p">Getty Images</p>
                        <p className="footer_item_p">www.istockphoto.com</p>
                        <a className="footer_item_a">VIEW DETAILS</a>
                    </div>
                </div>
            </div>

            <p className="footer_info_p1">E-mail To Us</p>
            <p className="footer_info_p2"> 7sevensmart@gmail.com</p>
            <div className="footer_info_div">
                <a className="footer_info_icon" href="/">

                </a>
                <a className="footer_info_icon" href="/">

                </a>
                <a className="footer_info_icon" href="/">

                </a>

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
        </div>
    )
}

export default Footer;