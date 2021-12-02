import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import UrlImageDownloader from 'react-url-image-downloader'
import axios from 'axios';





function Admin() {

    const [mode, setMode] = useState('add');    // add or update
    const [addedImg, setAddedImg] = useState('');
    const [addedTitle, setAddedTitle] = useState('');
    const [addedcat1, setAddedCat1] = useState('');
    const [addedcat2, setAddedCat2] = useState('');
    const [addedcat3, setAddedCat3] = useState('');
    const [addedcontent, setAddedContent] = useState('');
    const [addedImageUrl, setAddedImgUrl] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    const [cateData, setCateData] = useState(null)
    const [link1, setLink1] = useState('');
    const [link2, setLink2] = useState('');
    const [link3, setLink3] = useState('');

    const cookies = new Cookies();


    async function fetchCategories() {
        const res = await axios.get('http://61.100.186.15:5000/getCategories')
        if (res.data && res.data.success) {
            setCateData(res.data.data)
        }
    }

    async function handleSaveItem(){
        if(imgSrc === null){
            alert("이미지를 삽입해주세요.")
            return;
        }
        if(addedTitle.trim().length === 0){
            alert("제목을 입력해주세요.")
            return;
        }
        if(addedcontent.trim().length === 0){
            alert("내용을 입력해주세요.")
            return;
        }
        if(link1.trim().length === 0 && link2.trim().length === 0 && link3.trim().length === 0){
            alert("링크중 하나를 반드시 입력해주세요.");
            return;
        }


        const res = await axios.post('http://61.100.186.15:5000/createItem', {
            "image": imgSrc,
            "code": addedcat3,
            "title": addedTitle,
            "content": addedcontent,
            "links": {
                'shutterstock': link1,
                'adobestock': link2,
                'istockphoto': link3
            }
        })
       
    }


    async function makeURL(){
        const res = await axios.post('http://61.100.186.15:5000/createImage', {
            "image": imgSrc
        })
        if(res && res.data.success){
            setImgSrc(res.data.data);
        }
    }





    useEffect(() => {
        fetchCategories();
    }, [])



    if (cookies.get('loginState') === 'true' && cateData) {
        return (
            <div>
                <button onClick={e => setMode('add')}>추가하기</button>
                <button onClick={e => setMode('update')}>수정하기</button>
                <div className="admin_body">
                    {
                        mode === "add" ?
                            <div className="admin_add">
                                <div className="admin_add_left">
                                    <input className="admin_add_img_input" type="file" onChange={e => {
                                        const regexp = /\.(gif|jpg|jpeg|tiff|png)$/i;
                                        let reader = new FileReader();
                                        let file = e.target.files[0];
                                        let result = '';
                                        if (file && !regexp.test(file.name)) {
                                            return null;
                                        }

                                        if (file) {
                                            reader.readAsDataURL(file);
                                            reader.onloadend = () => {
                                                let base64data = reader.result;
                                                setImgSrc(base64data);
                                            }
                                        }
                                    }}
                                    />
                                    <button onClick={e => makeURL()}>에라이</button>
                                </div>
                                <div className="admin_add_right">
                                    <span>제목</span>
                                    <input className="admin_add_right_input" value={addedTitle} onChange={e => setAddedTitle(e.target.value)} />
                                    <div>
                                        <p>카테고리 선택</p>
                                        <select value={addedcat1} onChange={e => setAddedCat1(e.target.value)}>
                                            {
                                                cateData['cat1'].map(d => {
                                                    return <option value={d.code}>{d.text}</option>
                                                })
                                            }
                                        </select>
                                        <select value={addedcat2} onChange={e => setAddedCat2(e.target.value)}>
                                            {
                                                cateData['cat2'].map(d => {
                                                    return <option value={d.code}>{d.text}</option>
                                                })
                                            }
                                        </select>
                                        {
                                            addedcat1 !== '' && addedcat2 !== '' && cateData['cat3'].filter(d => (d['cat1'] === Number(addedcat1) && d['cat2'] === Number(addedcat2))).length > 0 ?
                                                <select  onChange={e => setAddedCat3(e.target.value)}>
                                                    <option value="">선택해주세요</option>
                                                    {
                                                        cateData['cat3'].filter(d => (d['cat1'] === Number(addedcat1) && d['cat2'] === Number(addedcat2))).map(d => {
                                                            return <option value={d.code}>{d.text}</option>
                                                        })
                                                    }
                                                </select>
                                                :
                                                <span>존재하지 않는 카테고리입니다.</span>
                                        }
                                    </div>
                                    <div>
                                        <span>상세설명</span>
                                        <input type="textarea" value={addedcontent} onChange={e => setAddedContent(e.target.value)} />
                                    </div> 
                                    <div>
                                        <span>shutterstock 링크</span>
                                        <input value={link1} onChange={e => setLink1(e.target.value)} />
                                    </div>
                                    <div>
                                        <span>adobestock 링크</span>
                                        <input value={link2} onChange={e => setLink2(e.target.value)} />
                                    </div>
                                    <div>
                                        <span>istockphoto 링크</span>
                                        <input value={link3} onChange={e => setLink3(e.target.value)} />
                                    </div>
                                    <button onClick={ e => {
                                        handleSaveItem();
                                    }}>추가하기</button>
                                </div>
                            </div>
                            :
                            <div>
                                update
                            </div>
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div className="wrongwayText">잘못된 접근입니다. 다시 로그인해주세요.</div>
        )
    }


}

export default Admin;