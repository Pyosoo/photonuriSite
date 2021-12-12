import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import CustomModal from './CustomModal';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { Input, Select, Button, Modal, Pagination } from 'antd';
import AdSense from 'react-adsense';
import 'antd/dist/antd.css';

function Folder({ location, match }) {
    const history = useHistory();
    const [category, setCategory] = useState(null);
    const [code, setCode] = useState(location.pathname.split('/')[location.pathname.split('/').length - 1])
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState([1])
    const [totalLength, setTotalLength] = useState(0);
    const [selectedItems, setSelectedItems] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [pageNum, setPageNum] = useState(1);

    const [mainImgItem, setMainImgItem] = useState(null);
    const [mainImgCategory, setMainImgCateogry] = useState('');

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false)
    }


    async function GetItems() {
        const res = await axios.post('http://61.100.186.15:5000/searchItems', {
            "code": code,
            "page": pageNum,
        })
        if (res.data.success) {
            setItems(res.data.data.items)
            setTotalLength(res.data.data.total)
            setMainImgItem(res.data.data.items[0]);
            catchCategory(res.data.data.items[0].code)
        }
    }

    async function fetchCategories() {
        const res = await axios.get('http://61.100.186.15:5000/getCategories')
        if (res.data && res.data.success) {
            setCategory(res.data.data)
        }
    }

    const changePageNum = num => {
        setPageNum(num);
    }

    const catchCategory = code => {
        console.log("들어옴")
        let cg = [];
        if(!category){
            console.log("들어옴")
            cg = location.state.categoryData;
        } else { cg = category }

        let codeString = code + "";
        let cat1 = codeString.substr(0,3);
        let cat2 = codeString.substr(2,2);
        let cat3 = codeString.substr(5);
        let result = "";
        for(let i=0; i<cg['cat1'].length; i++){
            if(cg['cat1'][i].code+"" === cat1){
                result += cg['cat1'][i].text;
                result += " > ";
            }
        }
        for(let i=0; i<cg['cat3'].length; i++){
            if(cg['cat3'][i].code === codeString){
                result += (cg['cat3'][i].region + " > " + cg['cat3'][i].text)
            }
        }
        setMainImgCateogry(result);
    }






    useEffect(() => {
        GetItems()
    }, [pageNum])


    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        fetchCategories();
    }, [])

    return (
        <div className="photo_container">

            <div className="folder_ad">
                <AdSense.Google
                    style={{ display: 'block' }}
                    client='ca-pub-7183258811881624'
                    slot='1234567890'
                    format='auto'
                    responsive='true'
                />
            </div>
            {
                mainImgItem ?
                    <div className="photo_main">
                        <div className="photo_main_left">
                            <img 
                                alt=""
                                src={mainImgItem.image} 
                                className="photo_main_img" 
                                onClick={e => {
                                    setModalOpen(true);
                                    setSelectedItems(mainImgItem);
                                }}
                            />
                        </div>
                        <div className="photo_main_right">
                            <p className="photo_main_p">{mainImgItem.title}</p>
                            <p className="photo_main_p">{mainImgCategory}</p>
                            <p className="photo_main_p2">{mainImgItem.content}</p>
                        </div>
                    </div>
                    :
                    null
            }


            <div className="photo_body">
                {
                    items.length > 0 ?
                        items.map(item => {
                            return (
                                <div className="photo_item" onClick={e => {
                                    setMainImgItem(item);
                                    catchCategory(item.code)
                                }}>
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="photo_img"
                                    />
                                    <p style={{ fontWeight: '700' }}>{item.title}</p>
                                </div>
                            )
                        })
                        :
                        <div style={{ marginTop: '150px', marginBottom: '150px', textAlign: 'center' }}>
                            <p >해당 카테고리에 맞는 사진이 없습니다. 다른 카테고리를 선택해주세요.</p>
                        </div>
                }
            </div>
            <div style={{ textAlign: 'center' }}>
                <Pagination
                    current={pageNum}
                    onChange={(page, pageSize) => {
                        changePageNum(page)
                        window.scrollTo(0,300)
                    }}
                    total={totalLength}
                    pageSize={10}
                />
                <Button 
                    style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '50px', marginBottom: '50px' }} 
                    onClick={e => {
                        history.push("/")
                    }}>처음으로</Button>

            </div>


            {
                selectedItems ?
                    <Modal
                        title={null}
                        visible={modalOpen}
                        onOk={closeModal}
                        onCancel={closeModal}
                        closable={false}
                        width={1300}
                        footer={
                            selectedItems ?
                                <div style={{ textAlign: 'center' }}>
                                    {
                                        selectedItems.links.adobestock.length > 0 ?
                                            <a rel="noreferrer" style={{ textDecoration: 'none', fontWeight: '800', marginLeft: '40px', marginRight: '40px' }} href={selectedItems.links.adobestock} target="_blank">adobeStock</a>
                                            :
                                            null
                                    }
                                    {
                                        selectedItems.links.istockphoto.length > 0 ?
                                            <a rel="noreferrer" style={{ textDecoration: 'none', fontWeight: '800', marginLeft: '40px', marginRight: '40px' }} href={selectedItems.links.istockphoto} target="_blank">istockphoto</a>
                                            :
                                            null
                                    }
                                    {
                                        selectedItems.links.shutterstock.length > 0 ?
                                            <a rel="noreferrer" style={{ textDecoration: 'none', fontWeight: '800', marginLeft: '40px', marginRight: '40px' }} href={selectedItems.links.shutterstock} target="_blank">shutterstock</a>
                                            :
                                            null
                                    }
                                    <Button onClick={e=>closeModal()} style={{display:'block', marginLeft:'auto', marginRight:'auto', marginTop:'15px', backgroundColor:'#565656', color:'white'}}>닫기</Button>
                                </div>
                                :
                                <Button onClick={e=>closeModal()} style={{display:'block', marginLeft:'auto', marginRight:'auto', marginTop:'15px', backgroundColor:'#565656', color:'white'}}>닫기</Button>
                        }

                    >
                        <div className="modal_container">
                            <div className="modal_adsense">
                            </div>
                            <div style={{height:'728px', lineHeight:'728px', verticalAlign:'middle', width:'100%'}}>
                                <img
                                    src={selectedItems.image}
                                    alt=""
                                    className="modal_image"
                                />
                            </div>
                            
                            <div className="modal_adsense">
                            </div>
                        </div>
                    </Modal>
                    : null
            }

        </div>
    )
}

export default Folder;