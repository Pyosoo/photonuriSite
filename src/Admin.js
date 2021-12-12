import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import UrlImageDownloader from 'react-url-image-downloader'
import axios from 'axios';
import { Input, Select, Button, Modal, Pagination } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;


function Admin() {

    const [mode, setMode] = useState('add');    // add or update
    const [addedImg, setAddedImg] = useState('');
    const [addedTitle, setAddedTitle] = useState('');
    const [addedcat1, setAddedCat1] = useState('선택');
    const [addedcat2, setAddedCat2] = useState('선택');
    const [addedcat3, setAddedCat3] = useState('선택');
    const [addedcontent, setAddedContent] = useState('');
    const [addedExpose, setAddedExpose] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);
    const [cateData, setCateData] = useState(null)
    const [link1, setLink1] = useState('');
    const [link2, setLink2] = useState('');
    const [link3, setLink3] = useState('');



    const [updateCat1, setUpdateCat1] = useState('선택');
    const [updateCat2, setUpdateCat2] = useState('선택');
    const [updateCat3, setUpdateCat3] = useState('선택');
    const [fetchData, setFetchData] = useState([]);
    const [fetchDataTotal, setFetchDataTotal] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const [selectedUpdateData, setSelectedUpdateData] = useState(null)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)

    const cookies = new Cookies();

    const closeModal = () => { setUpdateModalOpen(false) }


    async function fetchCategories() {
        const res = await axios.get('http://61.100.186.15:5000/getCategories')
        if (res.data && res.data.success) {
            setCateData(res.data.data)
        }
    }


    async function GetItems() {
        const res = await axios.post('http://61.100.186.15:5000/searchItems', {
            "code": updateCat3,
            "page": pageNum,
        })
        if (res.data.success) {
            setFetchData(res.data.data.items)
            setFetchDataTotal(res.data.data.total)
        }
    }


    async function handleSaveItem() {
        if (imgSrc === null) {
            alert("이미지를 삽입해주세요.")
            return;
        }
        if (addedTitle.trim().length === 0) {
            alert("제목을 입력해주세요.")
            return;
        }
        if (addedcontent.trim().length === 0) {
            alert("내용을 입력해주세요.")
            return;
        }
        if (link1.trim().length === 0 && link2.trim().length === 0 && link3.trim().length === 0) {
            alert("링크중 하나를 반드시 입력해주세요.");
            return;
        }
        if (addedcat1 === "선택" || addedcat2 === "선택" || addedcat3 === "선택") {
            alert("카테고리를 선택");
            return;
        }

        const res = await axios.post('http://61.100.186.15:5000/createItem', {
            "image": imgSrc,
            "code": addedcat3,
            "title": addedTitle,
            "content": addedcontent,
            "expose": addedExpose,
            "links": {
                'shutterstock': link1,
                'adobestock': link2,
                'istockphoto': link3
            }
        })
        if(res && res.data.success){
            alert("성공적으로 등록되었습니다.")
        }else{
            alert("등록에 실패했습니다.")
        }
    }


    async function modifyItem() {
        const res = await axios.post('http://61.100.186.15:5000/updateItem', {
            "image": selectedUpdateData.image,
            "title": selectedUpdateData.title,
            "content": selectedUpdateData.content,
            "links": selectedUpdateData.links,
            "_id": selectedUpdateData['_id'],
        })
        if (res.data.success) {
            alert("성공적으로 변경되었습니다.");
            setUpdateModalOpen(false);
        } else {
            alert("업데이트에 실패했습니다. 내용을 정확히 입력해주세요.")
        }
    }


    async function makeURL(data) {
        const res = await axios.post('http://61.100.186.15:5000/createImage', {
            "image": data
        })
        if (res && res.data.success) {
            setImgSrc(res.data.data);
        }
    }
    async function makeURL2(data) {
        const res = await axios.post('http://61.100.186.15:5000/createImage', {
            "image": data
        })
        if (res && res.data.success) {
            setSelectedUpdateData({
                ...selectedUpdateData,
                image: res.data.data
            })
        }
    }





    useEffect(() => {
        fetchCategories();
    }, [])

    useEffect(()=>{
        GetItems()
    }, [updateCat3, pageNum])




    if (cookies.get('loginState') === 'true' && cateData) {
        return (
            <div>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Button onClick={e => setMode('add')} style={{ marginLeft: '10px', marginRight: '10px' }}>추가페이지</Button>
                    <Button onClick={e => setMode('update')} style={{ marginLeft: '10px', marginRight: '10px' }}>수정페이지</Button>
                </div>

                <div className="admin_body">
                    {
                        mode === "add" ?
                            <div className="admin_add">
                                <div className="admin_add_left">

                                    <label className="input-file-button" for="input-file" >
                                        사진 업로드
                                    </label>
                                    <input
                                        type="file"
                                        id="input-file"
                                        style={{ display: "none" }}
                                        onChange={e => {
                                            const regexp = /\.(gif|jpg|jpeg|tiff|png)$/i;
                                            let reader = new FileReader();
                                            let file = e.target.files[0];
                                            if (file && !regexp.test(file.name)) {
                                                return null;
                                            }
                                            if (file) {
                                                reader.readAsDataURL(file);
                                                reader.onloadend = () => {
                                                    let base64data = reader.result;
                                                    makeURL(base64data);
                                                }
                                            }
                                        }}
                                    />
                                    <div>
                                        {
                                            imgSrc ?
                                                <>
                                                    <img src={imgSrc} style={{ width: '300px', height: '200px', marginTop: '10px' }} />
                                                    <p>실제사진의 비율과 다를 수 있습니다.</p>
                                                </>
                                                :
                                                null
                                        }
                                    </div>

                                </div>
                                <div className="admin_add_right">
                                    <span style={{ marginBottom: '5px', marginTop: '10px', fontWeight: '600' }}>제목</span>
                                    <Input className="admin_add_right_input" value={addedTitle} onChange={e => setAddedTitle(e.target.value)} />
                                    <div style={{ marginBottom: '10px' }}>
                                        <p style={{ marginBottom: '5px', marginTop: '10px', fontWeight: '600' }}>카테고리 선택</p>
                                        <Select style={{ width: '150px' }} value={addedcat1} onChange={e => {
                                            setAddedCat1(e);
                                            setAddedCat2('선택')
                                        }}>
                                            {
                                                cateData['cat1'].map(d => {
                                                    return <option value={d.code}>{d.text}</option>
                                                })
                                            }
                                        </Select>
                                        <Select style={{ width: '120px' }} value={addedcat2} onChange={e => {
                                            setAddedCat2(e);
                                            setAddedCat3('선택')
                                        }}>
                                            {
                                                cateData['cat2'].map(d => {
                                                    return <option value={d.code}>{d.text}</option>
                                                })
                                            }
                                        </Select>
                                        {
                                            addedcat1 !== '' && addedcat2 !== '' && cateData['cat3'].filter(d => (d['cat1'] === Number(addedcat1) && d['cat2'] === Number(addedcat2))).length > 0 ?
                                                <Select style={{ width: '150px' }} value={addedcat3} onChange={e => setAddedCat3(e)}>
                                                    {
                                                        cateData['cat3'].filter(d => (d['cat1'] === Number(addedcat1) && d['cat2'] === Number(addedcat2))).map(d => {
                                                            return <option value={d.code}>{d.text}</option>
                                                        })
                                                    }
                                                </Select>
                                                :
                                                <span></span>
                                        }
                                    </div>
                                    <div>
                                        <span style={{ marginBottom: '5px', marginTop: '10px', fontWeight: '600' }}>상세설명</span>
                                        <Input value={addedcontent} onChange={e => setAddedContent(e.target.value)} />
                                    </div>
                                    <div>
                                        <span style={{ marginBottom: '5px', marginTop: '10px', fontWeight: '600' }}>shutterstock 링크</span>
                                        <Input value={link1} onChange={e => setLink1(e.target.value)} />
                                    </div>
                                    <div>
                                        <span style={{ marginBottom: '5px', marginTop: '10px', fontWeight: '600' }}>adobestock 링크</span>
                                        <Input value={link2} onChange={e => setLink2(e.target.value)} />
                                    </div>
                                    <div>
                                        <span style={{ marginBottom: '5px', marginTop: '10px', fontWeight: '600' }}>istockphoto 링크</span>
                                        <Input value={link3} onChange={e => setLink3(e.target.value)} />
                                    </div>
                                    <div>
                                        <span>메인화면 노출여부</span>
                                        <input  style={{width:'15px', height:'15px'}} type="checkbox" value={addedExpose} onChange={e=> setAddedExpose(e.target.value)} />
                                    </div>
                                    <Button
                                        style={{ marginTop: '10px' }}
                                        onClick={e => {
                                            handleSaveItem();
                                        }}
                                    >추가하기</Button>
                                </div>
                            </div>
                            :
                            <div>
                                <div>
                                    <p>카테고리 선택</p>
                                    <Select
                                        value={updateCat1}
                                        onChange={e => setUpdateCat1(e)}
                                        style={{ width: '120px' }}
                                    >
                                        {
                                            cateData['cat1'].map(d => {
                                                return <Option value={d.code}>{d.text}</Option>
                                            })
                                        }
                                    </Select>
                                    <Select
                                        value={updateCat2}
                                        onChange={e => setUpdateCat2(e)}
                                        style={{ width: '120px' }}
                                    >
                                        {
                                            cateData['cat2'].map(d => {
                                                return <Option value={d.code}>{d.text}</Option>
                                            })
                                        }
                                    </Select>
                                    <Select
                                        value={updateCat3}
                                        onChange={e => {
                                            setUpdateCat3(e)
                                        }}
                                        style={{ width: '150px' }}
                                    >
                                        {
                                            cateData['cat3'].filter(c => (c.cat1 === updateCat1 && c.cat2 === updateCat2)).map(d => {
                                                return <Option value={d.code}>{d.text}</Option>
                                            })
                                        }
                                    </Select>
                                </div>

                                <div style={{ marginTop: '50px', display:'flex', justifyContent:'center', width:'100%', flexWrap:'wrap' }}>
                                    {
                                        fetchData.length > 0 ?
                                            fetchData.map(item => {
                                                return (
                                                    <div style={{width:'250px', marginRight:'20px', marginBottom:'20px'}}>
                                                        <img alt="" src={item.image} style={{width:'250px', height:'130px', marginBottom:'7px', objectFit:'cover'}} />
                                                        <Button
                                                            style={{ marginLeft: '10px', marginRight: '10px', marginLeft:'auto', marginRight:'auto', display:'block' }}
                                                            onClick={e => {
                                                                setSelectedUpdateData(item);
                                                                setUpdateModalOpen(true);
                                                            }}
                                                        >
                                                            {item.title}
                                                        </Button>
                                                    </div>
                                                )
                                            })
                                            :
                                            <p>해당 카테고리에 이미지가 없습니다.</p>
                                    }
                                </div>
                                <div style={{marginLeft:'auto', marginRight:'auto', display:'block', textAlign:'center', marginTop:'30px'}}>
                                    <Pagination
                                        current={pageNum}
                                        onChange={(page, pageSize) => setPageNum(page)}
                                        total={fetchDataTotal}
                                        pageSize={10}
                                    />
                                </div>
                            </div>
                    }
                </div>
                <Modal
                    title="수정하기"
                    visible={updateModalOpen}
                    onOk={closeModal}
                    onCancel={closeModal}
                    width={900}
                    footer={null}
                >
                    {
                        selectedUpdateData ?
                            <>
                                <div>
                                    <img src={selectedUpdateData.image} className="modal_image" />
                                    <label className="input-file-button" for="input-file2" style={{ display: 'block', width: '110px', marginTop: '10px', marginLeft: 'auto', marginRight: 'auto' }}>
                                        사진 교체
                                    </label>
                                    <input
                                        type="file"
                                        id="input-file2"
                                        style={{ display: "none" }}
                                        onChange={e => {
                                            const regexp = /\.(gif|jpg|jpeg|tiff|png)$/i;
                                            let reader = new FileReader();
                                            let file = e.target.files[0];
                                            if (file && !regexp.test(file.name)) {
                                                return null;
                                            }
                                            if (file) {
                                                reader.readAsDataURL(file);
                                                reader.onloadend = () => {
                                                    let base64data = reader.result;
                                                    makeURL2(base64data);
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="modal_content">
                                    <span>제목</span>
                                    <Input value={selectedUpdateData.title} onChange={e => setSelectedUpdateData({ ...selectedUpdateData, title: e.target.value })} />
                                </div>
                                <div className="modal_content">
                                    <span>설명</span>
                                    <Input value={selectedUpdateData.content} onChange={e => setSelectedUpdateData({ ...selectedUpdateData, content: e.target.value })} />
                                </div>
                                <div className="modal_content">
                                    <span>shutterstock 링크</span>
                                    <Input value={selectedUpdateData.links.shutterstock} onChange={e => setSelectedUpdateData({ ...selectedUpdateData, links: { ...selectedUpdateData.links, shutterstock: e.target.value } })} />
                                </div>
                                <div className="modal_content">
                                    <span>adobestock 링크</span>
                                    <Input value={selectedUpdateData.links.adobestock} onChange={e => setSelectedUpdateData({ ...selectedUpdateData, links: { ...selectedUpdateData.links, adobestock: e.target.value } })} />
                                </div>
                                <div className="modal_content">
                                    <span>istockphoto 링크</span>
                                    <Input value={selectedUpdateData.links.istockphoto} onChange={e => setSelectedUpdateData({ ...selectedUpdateData, links: { ...selectedUpdateData.links, istockphoto: e.target.value } })} />
                                </div>
                                <div className="modal_content">
                                    <span>메인화면 노출여부</span>
                                    <input type="checkbox" value={selectedUpdateData.expose} onChange={e => setSelectedUpdateData({ ...selectedUpdateData, expose: e.target.value })} />
                                </div>
                                <Button
                                    onClick={e => modifyItem()}
                                    style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '30px', marginBottom: '30px' }}
                                >
                                    수정하기
                                </Button>
                            </>
                            :
                            null
                    }

                </Modal>
            </div>
        )
    } else {
        return (
            <div className="wrongwayText">잘못된 접근입니다. 다시 로그인해주세요.</div>
        )
    }


}

export default Admin;