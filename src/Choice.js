import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const testdata = {
        "cat1": [
            {"code": 121, "text": "불교건축", "thumb": ""},
            {"code": 122, "text": "기타건축", "thumb": ""},
            {"code": 123, "text": "근대건축", "thumb": ""},
            {"code": 124, "text": "현대건축", "thumb": ""},
            {"code": 125, "text": "기독교건축", "thumb": ""},
            {"code": 126, "text": "천주교건축", "thumb": ""},
            {"code": 127, "text": "이슬람교건축", "thumb": ""},
        ],
        "cat2": [
            {"code": 1, "text": "경북"},
            {"code": 2, "text": "서울"},
            {"code": 3, "text": "강남"},
            {"code": 4, "text": "북부"},
            {"code": 5, "text": "서부"},
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
            <div className="cat1_div">
                {
                    testdata['cat2'].map(c => {
                        return(
                            <div className="cat2_item" onClick={e => setcat2(c.code)}>
                                {c.text}
                                <p onClick={e => setcat3(c.code)}>{c.text}</p>
                            </div>
                        )
                    })
                }
                <button className="cat_backbtn" onClick={e => setcat1(0)}> ← </button>
            </div>
        )

    } else {
        return (
            <div className="cat1_div">
                {
                    testdata['cat3'].map(c => {
                        return(
                            <div className="cat1_item">
                                <Link to={`/folder/${cat1+cat2+c.code}`}>
                                <img src={c.thumb} className="cat1_img" onClick={e => setcat1(c.code)} />
                                </Link>
                                <p className="cat1_title" >{c.text}</p>
                            </div>
                        )
                    })    
                }
                <button className="cat_backbtn" onClick={e => setcat2(0)}>←</button>
            </div>
        )
    }
}

export default Choice;