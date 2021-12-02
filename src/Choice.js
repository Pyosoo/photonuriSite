import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';




function Choice(props) {

    const [cateData, setCateData] = useState({});
    const [cat1, setcat1] = useState(0);
    const [cat2, setcat2] = useState(0);
    const [cat3, setcat3] = useState(0);

    async function fetchCategories(){
        const res = await axios.get('http://61.100.186.15:5000/getCategories')
        if(res.data && res.data.success){
            setCateData(res.data.data)
        }
    }


    useEffect(()=>{
        fetchCategories()
    },[])



    if(Object.entries(cateData).length !== 0){
        if (cat1 === 0) {
            return (
                <div className="cat1_div">
                    {
                        cateData['cat1'].map(c => {
                            return (
                                <div className="cat1_item">
                                    <img src={c.image} className="cat1_img" onClick={e => setcat1(c.code)} />
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
                <>
                    <div className="cat2_div">
                        <p className="cat2_title">지역을 선택해주세요.</p>
                        {
                            cateData['cat2'].map(c => {
                                return (
                                    <div className="cat2_item" onClick={e => setcat2(c.code)}>
                                        {c.text}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className="cat_backbtn" onClick={e => setcat1(0)}>뒤로가기</button>
                </>
    
            )
    
        } else {
            return (
                <>
                    <div className="cat1_div">
                        {
                            cateData['cat3'].filter(d => (d['cat1'] === cat1 && d['cat2'] === cat2)).map(c => {
                                return (
                                    <div className="cat1_item">
                                        <Link to={`/folder/${c.code}`}>
                                            <img src={c.image} className="cat1_img" onClick={e => setcat1(c.code)} />
                                        </Link>
                                        <p className="cat1_title" >{c.text}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* <button onClick={e => {
                        console.log(cat1); console.log(cat2);
                        console.log(cateData['cat3'].filter(d => (d.cat1 === cat1 && d.cat2 === cat2)))
                    }}>체크</button> */}
                    <button className="cat_backbtn" onClick={e => setcat2(0)}>뒤로가기</button>
                </>
            )
        }
    } else return <div>no Data</div>

    
}

export default Choice;