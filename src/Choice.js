import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const testdata = {
        "cat1": [
            {"code": 121, "text": "불교건축", "thumb": ""},
            {"code": 122, "text": "전통건축", "thumb": ""},
            {"code": 123, "text": "근대건축", "thumb": ""},
            {"code": 124, "text": "현대건축", "thumb": ""},
            {"code": 125, "text": "기타교건축", "thumb": ""},
        ],
        "cat2": [
            {"code": 1, "text": "경북"},
            {"code": 2, "text": "경남"},
            {"code": 3, "text": "전북"},
            {"code": 4, "text": "전남"},
            {"code": 5, "text": "충북"},
            {"code": 6, "text": "충남"},
            {"code": 7, "text": "강원"},
            {"code": 8, "text": "경기"},
            {"code": 9, "text": "제주"},
            {"code": 10, "text": "서울"},
            {"code": 11, "text": "부산"},
            {"code": 12, "text": "대구"},
            {"code": 13, "text": "대전"},
            {"code": 14, "text": "광주"},
            {"code": 15, "text": "울산"},
            {"code": 16, "text": "인천"},
        ],
        "cat3": [
            {"cat1": 121, "cat2": 1, "code": 1210101, "text": "부석사", "region": "영주", "thumb":""},
            {"cat1": 122, "cat2": 1, "code": 1220102, "text": "사석부", "region": "안동", "thumb":""},
            {"cat1": 123, "cat2": 1, "code": 1230101, "text": "일석사", "region": "영주", "thumb":""},
            {"cat1": 124, "cat2": 1, "code": 1240101, "text": "이석사", "region": "영주", "thumb":""},
            {"cat1": 125, "cat2": 1, "code": 1250101, "text": "삼석사", "region": "영주", "thumb":""},
        ]
    }


function Choice(props) {

    const [cat1, setcat1] = useState(0);
    const [cat2, setcat2] = useState(0);
    const [cat3, setcat3] = useState(0);
    console.log(props)

    if (cat1 === 0) {
        return (
            <div className="cat1_div">
               {
                   testdata['cat1'].map(c => {
                       return(
                           <div className="cat1_item">
                               <img src={c.thumb} className="cat1_img" onClick={e => setcat1(c.code)} />
                               <p className="cat1_title" >{c.text}</p>
                           </div>
                       )
                   })
               }
            </div>
        )
    }
    else if (cat2 === 0) {
        return (
            <div className="cat2_div">
                {
                    testdata['cat2'].map(c => {
                        return(
                            <div class="back">
                                <div class="button_base b02_slide_in" onClick={e => setcat2(c.code)}>
                                    <div>{c.text}</div>
                                    <div></div>
                                    <div>{c.text}</div>
                                </div>
                            </div>
                        )
                    })
                }
                <div class="back">
                    <div class="button_base b02_slide_in"  onClick={e => setcat1(0)}>
                        <div>뒤로가기</div>
                        <div></div>
                        <div>뒤로가기</div>
                    </div>
                </div>
            </div>
        )

    } else {
        return (
            <div className="cat1_div">
                {
                    testdata['cat3'].map(c => {
                        return(
                            <div className="cat3_item">
                                <Link to={`/folder/${cat1+cat2+c.code}`}>
                                <img src={c.thumb} className="cat3_img" onClick={e => setcat1(c.code)} />
                                </Link>
                                <p className="cat1_title" >{c.text}</p>
                            </div>
                        )
                    })    
                }
                <div class="back">
                    <div class="button_base b02_slide_in"  onClick={e => setcat2(0)}>
                        <div>뒤로가기</div>
                        <div></div>
                        <div>뒤로가기</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Choice;