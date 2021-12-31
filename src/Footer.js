import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';


function Footer() {
    return (
        <div className="footer">
            <p className="footer_t">How can I buy stock photo ?</p>
            <p className="footer_t">Where can I buy stock photo ?</p>

            <div className="footer_mid">
                <div className="footer_part">
                    <div className="footer_item">
                        <a className="footer_item_link" href="https://www.shutterstock.com/g/alnet">
                            <img alt="" className='footer_icon' src='http://www.photonuri.com/images/shutter_icon.png' />
                            <img alt="" className='footer_icon2' src="http://www.photonuri.com/images/shutter_text.png" />
                        </a>
                        <a className="footer_item_a" href="https://www.shutterstock.com/g/alnet" rel='noreferrer' target="_blank">click to view Details.</a>
                    </div>
                </div>
                <div className="footer_part">
                    <div className="footer_item">
                        <a className="footer_item_link" href="https://stock.adobe.com/kr/contributor/207850314/syston">
                            <img alt="" className='footer_icon' src='http://www.photonuri.com/images/adobe_icon.png' />
                            <img alt="" className='footer_icon2' src="http://www.photonuri.com/images/adobe_text.png" />
                        </a>
                        <a className="footer_item_a" href="https://stock.adobe.com/kr/contributor/207850314/syston" rel='noreferrer' target="_blank">click to view Details.</a>
                    </div>
                </div>
                <div className="footer_part_last">
                    <div className="footer_item">
                        <a className="footer_item_link" href="http://www.istockphoto.com/portfolio/syston">
                            <img alt="" className='footer_icon' src='http://www.photonuri.com/images/getty_icon.png' />
                            <img alt="" className='footer_icon2' src="http://www.photonuri.com/images/gety_text.png" />
                        </a>
                        <a className="footer_item_a" href="http://www.istockphoto.com/portfolio/syston" rel='noreferrer' target="_blank">click to view Details.</a>
                    </div>
                </div>
            </div>

            {/* <p className="footer_info_p1">E-mail To Us</p> */}
            <p className="footer_info_p2"> Copyright@1999 Syston All Right Reserved. syston@naver.com  </p>
        </div>
    )
}

export default Footer;