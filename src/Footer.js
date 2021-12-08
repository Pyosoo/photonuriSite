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
                            <img src="http://www.photonuri.com/images/shutterstock.jpg" />
                        </a>
                        <p className="footer_item_p">Shutterstock</p>
                        <p className="footer_item_p">www.shutterstock.com</p>
                        <a className="footer_item_a">VIEW DETAILS</a>
                    </div>
                </div>
                <div className="footer_part">
                    <div className="footer_item">
                        <a className="footer_item_link" href="https://stock.adobe.com/kr/contributor/207850314/syston">
                            <img src="http://www.photonuri.com/images/adobestock.jpg" />
                        </a>
                        <p className="footer_item_p">Adobe Stock</p>
                        <p className="footer_item_p">stock.adobe.com</p>
                        <a className="footer_item_a">VIEW DETAILS</a>
                    </div>
                </div>
                <div className="footer_part_last">
                    <div className="footer_item">
                        <a className="footer_item_link" href="http://www.istockphoto.com/portfolio/syston">
                            <img src="http://www.photonuri.com/images/istockphoto.jpg" />
                        </a>
                        <p className="footer_item_p">Getty Images</p>
                        <p className="footer_item_p">www.istockphoto.com</p>
                        <a className="footer_item_a">VIEW DETAILS</a>
                    </div>
                </div>
            </div>

            {/* <p className="footer_info_p1">E-mail To Us</p> */}
            <p className="footer_info_p2"> Copyright@1999 Syston All Right Reserved. syston@naver.com  </p>
            {/* <div className="footer_info_div">
                <a className="footer_info_icon" href="/">

                </a>
                <a className="footer_info_icon" href="/">

                </a>
                <a className="footer_info_icon" href="/">

                </a>

               
            </div> */}
        </div>
    )
}

export default Footer;