import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import UrlImageDownloader from 'react-url-image-downloader'
import axios from 'axios';
import { Input, Select, Button, Modal, Pagination } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;
const { TextArea } = Input;

const cookie = new Cookies();

function Admin() {

    const [mode, setMode] = useState('add');    // add or update
    const [addedImg, setAddedImg] = useState('');
    const [addedTitle, setAddedTitle] = useState('');
    const [addedcat1, setAddedCat1] = useState('선택');
    const [addedcat2, setAddedCat2] = useState('선택');
    const [addedcat3, setAddedCat3] = useState('선택');
    const [addedcontent, setAddedContent] = useState('');
    const [addedExpose, setAddedExpose] = useState(false);
    const [addImgList, setAddImgList] = useState([]);
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

    const [modifyCat1, setModifyCat1] = useState('선택');
    const [modifyCat2, setModifyCat2] = useState('선택');
    const [modifyCateogryInputValue, setModifyCateogryInputValue] = useState('');
    const [categoryModifyMode, setCateogryModifyMode] = useState(false);
    const [categoryModifyCode, setCategoryModifyCode] = useState(0);

    const [addCateModalOpen, setAddCateModalOpen] = useState(false);
    const [addCateValue, setAddCateValue] = useState('');
    const [addCateRegion, setAddCateRegion] = useState('');


    const cookies = new Cookies();

    const closeModal = () => { setUpdateModalOpen(false) }
    const closeModal2 = () => { setAddCateModalOpen(false) }


    async function fetchCategories() {
        const res = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/getCategories`)
        if (res.data && res.data.success) {
            setCateData(res.data.data)
        }
    }


    async function GetItems() {
        const res = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/searchItems`, {
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
            alert("카테고리를 선택해주세요.");
            return;
        }

        const res = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/createItem`,
        {
            "image": imgSrc,
            "listImage": addImgList,
            "code": addedcat3,
            "title": addedTitle,
            "content": addedcontent,
            "expose": addedExpose,
            "links": {
                'shutterstock': link1,
                'adobestock': link2,
                'istockphoto': link3
            }
        },{
            headers: {
                auth : cookie.get('auth') 
            }
        })
        if (res && res.data.success) {
            alert("성공적으로 등록되었습니다.")
        } else {
            alert("등록에 실패했습니다.")
        }
    }


    async function modifyItem() {
        console.log(selectedUpdateData)
        const res = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/updateItem`, {
            "image": selectedUpdateData.image,
            "listImage": selectedUpdateData.listImage,
            "title": selectedUpdateData.title,
            "content": selectedUpdateData.content,
            "links": selectedUpdateData.links,
            "_id": selectedUpdateData['_id'],
            "expose": selectedUpdateData.expose
        },{
            headers: {
                auth : cookie.get('auth') 
            }
        })
        if (res.data.success) {
            alert("성공적으로 변경되었습니다.");
            setUpdateModalOpen(false);
            setFetchData(fetchData.map(d => {
                if (d._id === selectedUpdateData['_id']) {
                    return {
                        "image": selectedUpdateData.image,
                        "listImage": selectedUpdateData.listImage,
                        "title": selectedUpdateData.title,
                        "content": selectedUpdateData.content,
                        "links": selectedUpdateData.links,
                        "_id": selectedUpdateData['_id'],
                        "expose": selectedUpdateData.expose
                    }
                } else return d;
            }))
        } else {
            alert("업데이트에 실패했습니다. 내용을 정확히 입력해주세요.")
        }
    }

    async function deleteItem() {
        const res = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/deleteItem`, {
            "_id": selectedUpdateData['_id'],
        },{
            headers: {
                auth : cookie.get('auth') 
            }
        })
        if (res.data.success) {
            alert("성공적으로 삭제되었습니다.");
            setFetchData(fetchData.filter(d => d._id !== selectedUpdateData['_id']));
            setFetchDataTotal(fetchDataTotal - 1)
            setUpdateModalOpen(false);
        } else {
            alert("삭제에 실패했습니다.")
        }
    }

    async function modifyCategory(_code, _region) {
        console.log(_code, _region)
        const res = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/modifyCategory`, {
            "code": _code,
            "text": modifyCateogryInputValue,
            "region": _region
        },{
            headers: {
                auth : cookie.get('auth') 
            }
        })
        if (res.data.success) {
            alert("성공적으로 수정되었습니다.");
            setUpdateModalOpen(false);
            setCateogryModifyMode(false);
            window.location.reload();
        } else {
            alert("수정에 실패했습니다.");
            setCateogryModifyMode(false);
        }
    }

    async function addCategory(_code) {
        const res = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/addCategory`, {
            "cat1": modifyCat1,
            "cat2": modifyCat2,
            "text": addCateValue,
            "region": addCateRegion
        },{
            headers: {
                auth : cookie.get('auth') 
            }
        })
        if (res.data.success) {
            alert("성공적으로 추가되었습니다.");
            setUpdateModalOpen(false);
            window.location.reload();
        } else {
            alert("삭제에 실패했습니다.")
        }
    }


    async function makeURL(data) {
        console.log('makeURL1')
        const res = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/createImage`, {
            "image": data
        },{
            headers: {
                auth : cookie.get('auth') 
            }
        })
        if (res && res.data.success) {
            setImgSrc(res.data.data.listImage);
            setAddImgList(res.data.data);
        }
    }
    async function makeURL2(data) {
        console.log('makeURL2')
        const res = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/createImage`, {
            "image": data
        },{
            headers: {
                auth : cookie.get('auth') 
            }
        })
        if (res && res.data.success) {
            console.log(res.data.data)
            setSelectedUpdateData({
                ...selectedUpdateData,
                image: res.data.data.listImage,
                listImage: res.data.data
            })
        }else {
            console.log("Error")
        }
    }





    useEffect(() => {
        fetchCategories();
    }, [])

    useEffect(() => {
        GetItems()
    }, [updateCat3, pageNum])




    if (cookies.get('loginState') === 'true' && cateData) {
        return (
            <div>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Button onClick={e => setMode('add')} style={{ marginLeft: '10px', marginRight: '10px' }}>사진추가</Button>
                    <Button onClick={e => setMode('modifyImage')} style={{ marginLeft: '10px', marginRight: '10px' }}>사진수정</Button>
                    <Button onClick={e => setMode('modifyCategory')} style={{ marginLeft: '10px', marginRight: '10px' }}>카테고리수정</Button>
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
                                                    <img alt="" src={imgSrc} style={{ width: '300px', height: '200px', marginTop: '10px' }} />
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
                                        <Select style={{ width: '150px', marginRight: '15px' }} value={addedcat1} onChange={e => {
                                            setAddedCat1(e);
                                            setAddedCat2('선택')
                                        }}>
                                            {
                                                cateData['cat1'].map(d => {
                                                    return <option value={d.code}>{d.text}</option>
                                                })
                                            }
                                        </Select>
                                        <Select style={{ width: '120px', marginRight: '15px' }} value={addedcat2} onChange={e => {
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
                                                <span>앞선 카테고리를 선택해주세요.</span>
                                        }
                                    </div>
                                    <div>
                                        <span style={{ marginBottom: '5px', marginTop: '10px', fontWeight: '600' }}>상세설명</span>
                                        <TextArea rows={4} value={addedcontent} onChange={e => setAddedContent(e.target.value)} />
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
                                        <input style={{ width: '15px', height: '15px', marginTop: '20px' }} type="checkbox" checked={addedExpose} onChange={e => setAddedExpose(e.target.checked)} />
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
                            mode === "modifyImage" ?
                                <>
                                    <div>
                                        <div>
                                            <div>
                                                <p>이미지수정 카테고리선택</p>
                                                <Select
                                                    value={updateCat1}
                                                    onChange={e => setUpdateCat1(e)}
                                                    style={{ width: '120px', marginRight: '15px' }}
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
                                                    style={{ width: '120px', marginRight: '15px' }}
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

                                            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
                                                {
                                                    fetchData.length > 0 ?
                                                        fetchData.map(item => {
                                                            return (
                                                                <div style={{ width: '250px', marginRight: '20px', marginBottom: '20px' }}>
                                                                    <img alt="" src={item.image} style={{ width: '250px', height: '130px', marginBottom: '7px', objectFit: 'cover' }} />
                                                                    <Button
                                                                        style={{ marginLeft: '10px', marginRight: '10px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
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
                                            <div style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', textAlign: 'center', marginTop: '30px' }}>
                                                <Pagination
                                                    current={pageNum}
                                                    onChange={(page, pageSize) => setPageNum(page)}
                                                    total={fetchDataTotal}
                                                    pageSize={20}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                mode === "modifyCategory" ?
                                    <div>
                                        <div>
                                            <p>카테고리수정 카테고리선택</p>
                                            <Select
                                                value={modifyCat1}
                                                onChange={e => setModifyCat1(e)}
                                                style={{ width: '120px', marginRight: '15px' }}
                                            >
                                                {
                                                    cateData['cat1'].map(d => {
                                                        return <Option value={d.code}>{d.text}</Option>
                                                    })
                                                }
                                            </Select>
                                            <Select
                                                value={modifyCat2}
                                                onChange={e => setModifyCat2(e)}
                                                style={{ width: '120px', marginRight: '15px' }}
                                            >
                                                {
                                                    cateData['cat2'].map(d => {
                                                        return <Option value={d.code}>{d.text}</Option>
                                                    })
                                                }
                                            </Select>
                                            <div style={{ display: 'flex', marginTop: '50px', marginBottom: '50px', flexWrap: 'wrap' }}>
                                                {
                                                    cateData['cat3'].filter((c) => (c.cat1 === modifyCat1 && c.cat2 === modifyCat2)).map((d, index) => {
                                                        return <div className='modifyCategoryItem'>
                                                            {
                                                                categoryModifyMode && d.code === categoryModifyCode ?
                                                                    <input value={modifyCateogryInputValue} onChange={e => setModifyCateogryInputValue(e.target.value)} />
                                                                    :
                                                                    <div className='modifyDiv'>{index}. {d.text}</div>
                                                            }
                                                            {
                                                                categoryModifyMode ?
                                                                    <button className='modifyButton' onClick={e => modifyCategory(d.code, d.region)}>확인</button>
                                                                    :
                                                                    <button className='modifyButton' onClick={e => {
                                                                        setCateogryModifyMode(true);
                                                                        setCategoryModifyCode(d.code);
                                                                    }}>수정</button>
                                                            }
                                                            {
                                                                categoryModifyMode ?
                                                                    <button className='modifyButton' onClick={e => setCateogryModifyMode(false)}>취소</button>
                                                                    :
                                                                    null

                                                            }
                                                        </div>
                                                    })
                                                }
                                                {
                                                    modifyCat1 !== '선택' && modifyCat2 !== '선택' ?
                                                        <div className='addNewCategory'>
                                                            <Button style={{ height: '50px', lineHeight: '50px', verticalAlign: 'middle' }} onClick={e => setAddCateModalOpen(true)}>카테고리 추가하기</Button>
                                                        </div>
                                                        : null
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
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
                                    <img alt='' src={selectedUpdateData.image} className="modal_image" />
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
                                    <input type="checkbox" checked={selectedUpdateData.expose} onChange={e => setSelectedUpdateData({ ...selectedUpdateData, expose: e.target.checked })} />
                                </div>
                                <Button
                                    onClick={e => modifyItem()}
                                    style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '30px', marginBottom: '30px' }}
                                >
                                    수정하기
                                </Button>
                                <Button
                                    onClick={e => deleteItem()}
                                    style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '30px', marginBottom: '30px' }}
                                >
                                    삭제하기
                                </Button>
                            </>
                            :
                            null
                    }
                </Modal>
                <Modal
                    title="카테고리 추가하기"
                    visible={addCateModalOpen}
                    onOk={closeModal2}
                    onCancel={closeModal2}
                    width={900}
                    footer={null}
                >
                    <Input
                        style={{ width: '300px', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', marginBottom: '10px' }}
                        value={addCateRegion} onChange={e => setAddCateRegion(e.target.value)} placeholder='지역명을 입력해주세요.' />
                    <Input
                        style={{ width: '300px', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', marginBottom: '10px' }}
                        value={addCateValue} onChange={e => setAddCateValue(e.target.value)} placeholder='카테고리 이름을 입력하세요.' />
                    <Button
                        style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                        onClick={e => addCategory()}> 추가하기 </Button>

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