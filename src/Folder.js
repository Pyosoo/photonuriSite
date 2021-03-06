import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { Input, Select, Button, Modal, Pagination } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import {Adsense} from '@ctrl/react-adsense';
import {Cookies , useCookies} from 'react-cookie';
import 'antd/dist/antd.css';
const { Option } = Select;

const cookies = new Cookies();

function Folder({ location, match }) {
    const history = useHistory();
    const [category, setCategory] = useState(null);
    const [code, setCode] = useState(location.pathname.split('/')[location.pathname.split('/').length - 1])
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState([{listImage: []}])
    const [totalLength, setTotalLength] = useState(0);
    const [selectedItems, setSelectedItems] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [pageNum, setPageNum] = useState(1);

    const [mainImgItem, setMainImgItem] = useState(null);
    const [mainImgCategory, setMainImgCateogry] = useState('');
    const [mainImgIndex, setMainImgIndex] = useState(0);

    const [moveCategoryModalOpen, setMoveCategoryModalOpen] = useState(false);
    const [moveCat1, setMoveCat1] = useState('선택');
    const [moveCat2, setMoveCat2] = useState('선택');
    const [moveCat3, setMoveCat3] = useState('선택');

    const imageSrcUrl = 'http://www.photonuri.com/images/';


    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false)
    }

    const openModal2 = () => {
        setMoveCategoryModalOpen(true);
    }
    const closeModal2 = () => {
        setMoveCategoryModalOpen(false)
    }

    async function GetItems(c) {
        const res = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/searchItems`, {
            "code": c === 0 ? code : c,
            "page": pageNum,
        },{
            cookie : cookies.get('auth')
        })
        console.log(res);
        if (res.data.success && res.data.data.items.length > 0) {
            console.log(res.data.data.items)
            setItems(res.data.data.items)
            setTotalLength(res.data.data.total)
            for(let i=0; i<res.data.data.items.length; i++){
                if(res.data.data.items[i]._id === location.state.ID){
                    setMainImgItem(res.data.data.items[i]);
                    break;
                }
                if(i === res.data.data.items.length -1 && res.data.data.items[i]._id !== location.state.ID){
                    console.log("not found")
                    setMainImgItem(res.data.data.items[0]);
                }
            }
            catchCategory(res.data.data.items[0].code)
        } else {
            setItems([])
            setTotalLength(0)
            setMainImgItem({});
            catchCategory(0)
        }
    }

    async function fetchCategories() {
        const res = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/getCategories`)
        if (res.data && res.data.success) {
            setCategory(res.data.data)
        }
    }

    const changePageNum = num => {
        setPageNum(num);
    }

    const catchCategory = code => {
        let cg = [];
        if (!category) {
            cg = location.state.categoryData;
        } else { cg = category }

        let codeString = code + "";
        console.log(codeString)
        let cat1 = codeString.substr(0, 3);
        let cat2 = codeString.substr(3, 2);
        let cat3 = codeString.substr(5);
        console.log(cat1, cat2, cat3)
        let result = "";
        for (let i = 0; i < cg['cat1'].length; i++) {
            if (cg['cat1'][i].code + "" === cat1) {
                result += cg['cat1'][i].text;
                result += " > ";
            }
        }
        for (let i = 0; i < cg['cat2'].length; i++) {
            if (parseInt(cg['cat2'][i].code) === parseInt(cat2)) {
                result += cg['cat2'][i].text;
            }
        }
        for (let i = 0; i < cg['cat3'].length; i++) {
            if (cg['cat3'][i].code === codeString) {
                result += ("(" + cg['cat3'][i].region + ")  > " + cg['cat3'][i].text)
            }
        }
        setMainImgCateogry(result);
    }

    const changeMainLeft = () => {
        if(mainImgIndex !== 0){
            setSelectedItems(items[mainImgIndex-1]);
            setMainImgIndex(mainImgIndex-1)
        }
    }
    const changeMainRight = () => {
        if(mainImgIndex !== items.length -1){
            setSelectedItems(items[mainImgIndex+1]);
            setMainImgIndex(mainImgIndex+1)
        }
    }




    useEffect(() => {
        GetItems(0)
    }, [pageNum])


    useEffect(() => {
        fetchCategories();
        
    }, [])

    return (
        <div className="photo_container">
            <div className="folder_ad">
                <Adsense
                    client='ca-pub-7183258811881624'
                    slot='5993734338'
                    style={{ width: 728, height: 90 }}
                />
            </div>

            {/* 메인이미지 세부설명 나와있는 곳 */}
            {
                mainImgItem && items.length > 0 ?
                    <>
                        <div className="photo_main">
                            <div className="photo_main_left">
                                    <img
                                        alt=""
                                        src={mainImgItem.listImage.mainImage}
                                        className="photo_main_img"
                                        onClick={e => {
                                            setModalOpen(true);
                                            setSelectedItems(mainImgItem);
                                        }}
                                    />
                            </div>
                            <div className="photo_main_right">
                                <div className="photo_main_p">
                                    {mainImgCategory}
                                    <p className='photo_main_subT'>
                                        Category
                                        <button
                                            className='moveBtn2'
                                            onClick={e => setMoveCategoryModalOpen(true)}
                                        >Move</button>
                                    </p>

                                    <div className='photo_divider'></div>
                                </div>
                                <div className="photo_main_p">
                                    {mainImgItem.title}
                                    <p className='photo_main_subT'>
                                        Name
                                    </p>
                                    <div className='photo_divider'></div>
                                </div>
                                
                                <div className="photo_main_p2">
                                    {mainImgItem.content}
                                    <p className='photo_main_subT2'>Details</p>
                                </div>
                            </div>
                        </div>
                        <div 
                            style={{ 
                                width:'1300px',
                                marginRight:'auto', 
                                display: 'flex', 
                                justifyContent:'left',
                                marginLeft:'auto', 
                                marginTop: '0px', 
                                marginBottom: '50px',
                                }}
                            >
                            {
                                mainImgItem.links.shutterstock.length > 0 ?
                                    <div className='modal_link_div'>
                                        <a href={mainImgItem.links.adobestock} target="_blank">
                                            <img style={{ width: '30px', marginLeft:'auto', marginRight:'auto' }} alt="" rel="noreferrel" src={imageSrcUrl + "shutter_active.png"} />
                                        </a>
                                    </div>
                                    :
                                    <div className='modal_link_div_no'>
                                        <img style={{ width: '30px', marginLeft:'auto', marginRight:'auto' }} alt="" rel="noreferrel" src={imageSrcUrl + "shutter.png"} />
                                    </div>
                            }
                            {
                                mainImgItem.links.adobestock.length > 0 ?
                                    <div className='modal_link_div'>
                                        <a href={mainImgItem.links.adobestock} target="_blank">
                                            <img style={{ width: '30px', marginLeft:'auto', marginRight:'auto' }} alt="" rel="noreferrel" src={imageSrcUrl + "adobe_active.png"} />
                                        </a>
                                    </div>
                                    :
                                    <div className='modal_link_div_no'>
                                        <img style={{ width: '30px', marginLeft:'auto', marginRight:'auto' }} alt="" rel="noreferrel" src={imageSrcUrl + "adobe.png"} />
                                    </div>
                            }
                            {
                                mainImgItem.links.istockphoto.length > 0 ?
                                    <div className='modal_link_div'>
                                        <a href={mainImgItem.links.istockphoto} target="_blank">
                                        <img style={{ width: '30px', marginLeft:'auto', marginRight:'auto' }} alt="" rel="noreferrel" src={imageSrcUrl + "gitty_active.png"} />
                                        </a>
                                    </div>
                                    :
                                    <div className='modal_link_div_no'>
                                        <img style={{ width: '30px', marginLeft:'auto', marginRight:'auto' }} alt="" rel="noreferrel" src={imageSrcUrl + "gitty.png"} />
                                    </div>
                            }
                            <p className='modal_link_text'>〈〈 click to downloads</p>
                        </div>
                    </>
                    :
                    null
            }




            {/* 폴더 이미지 리스트 나오는 곳 */}
            <div className="photo_body">
                {
                    items.length > 0 ?
                        items.map((item,index) => {
                            return (
                                <div className="photo_item" onClick={e => {
                                    setMainImgItem(item);
                                    setMainImgIndex(index);
                                    catchCategory(item.code)
                                }}>
                                    <img
                                        src={item.listImage.listImage}
                                        alt=""
                                        className="photo_img"
                                    />
                                    <p style={{ fontWeight: '700' }}>{item.title}</p>
                                </div>
                            )
                        })
                        :
                        <div style={{ marginTop: '150px', marginBottom: '150px', textAlign: 'center' }}>
                            <p>해당 카테고리에 맞는 사진이 없습니다. 다른 카테고리를 선택해주세요.</p>
                            <div style={{ height: '200px', lineHeight: '200px' }}>
                                <Select
                                    value={moveCat1}
                                    onChange={e => setMoveCat1(e)}
                                    style={{ width: '120px', marginRight: '15px' }}
                                    size='large'
                                >
                                    {
                                        category['cat1'].map(d => {
                                            return <Option value={d.code}>{d.text}</Option>
                                        })
                                    }
                                </Select>
                                <Select
                                    value={moveCat2}
                                    onChange={e => setMoveCat2(e)}
                                    style={{ width: '120px', marginRight: '15px' }}
                                    size='large'
                                >
                                    {
                                        category['cat2'].map(d => {
                                            return <Option value={d.code}>{d.text}</Option>
                                        })
                                    }
                                </Select>
                                <Select
                                    value={moveCat3}
                                    onChange={e => setMoveCat3(e)}
                                    style={{ width: '150px' }}
                                    size='large'
                                >
                                    {
                                        category['cat3'].filter(c => (c.cat1 === moveCat1 && c.cat2 === moveCat2)).map(d => {
                                            return <Option value={d.code}>{d.text}</Option>
                                        })
                                    }
                                </Select>
                                <button
                                    className='moveBtn'
                                    onClick={e => {
                                        GetItems(moveCat3);
                                        setMoveCategoryModalOpen(false);
                                    }}
                                >
                                    이동
                                </button>
                            </div>
                        </div>
                }
            </div>
            <div style={{ textAlign: 'center' }}>
                <Pagination
                    current={pageNum}
                    onChange={(page, pageSize) => {
                        changePageNum(page)
                        window.scrollTo(0, 300)
                    }}
                    total={totalLength}
                    pageSize={10}
                />
                {/* <Button
                    style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '50px', marginBottom: '50px' }}
                    onClick={e => {
                        history.push("/")
                    }}>처음으로</Button> */}

            </div>


            
            <div 
                className="folder_ad"
                style={{marginTop:'30px', marginBottom:'70px'}}
            >
                <Adsense
                    client='ca-pub-7183258811881624'
                    slot='5993734338'
                    style={{ width: 728, height: 90 }}
                />
            </div>

            {/*  카테고리 이동 모달창  */}
            {
                category ?
                    <Modal
                        title={'카테고리 이동'}
                        visible={moveCategoryModalOpen}
                        onOk={closeModal2}
                        onCancel={closeModal2}
                        closable={true}
                        width={560}
                        height={300}
                        footer={null}

                    >
                        <div style={{ height: '200px', lineHeight: '200px' }}>
                            <Select
                                value={moveCat1}
                                onChange={e => setMoveCat1(e)}
                                style={{ width: '120px', marginRight: '15px' }}
                                size='large'
                            >
                                {
                                    category['cat1'].map(d => {
                                        return <Option value={d.code}>{d.text}</Option>
                                    })
                                }
                            </Select>
                            <Select
                                value={moveCat2}
                                onChange={e => setMoveCat2(e)}
                                style={{ width: '120px', marginRight: '15px' }}
                                size='large'
                            >
                                {
                                    category['cat2'].map(d => {
                                        return <Option value={d.code}>{d.text}</Option>
                                    })
                                }
                            </Select>
                            <Select
                                value={moveCat3}
                                onChange={e => setMoveCat3(e)}
                                style={{ width: '150px' }}
                                size='large'
                            >
                                {
                                    category['cat3'].filter(c => (c.cat1 === moveCat1 && c.cat2 === moveCat2)).map(d => {
                                        return <Option value={d.code}>{d.text}</Option>
                                    })
                                }
                            </Select>
                            <button
                                className='moveBtn'
                                onClick={e => {
                                    GetItems(moveCat3);
                                    setMoveCategoryModalOpen(false);
                                }}
                            >
                                이동
                            </button>
                        </div>
                    </Modal>
                    :
                    null
            }


            {
                selectedItems ?
                    <Modal
                        title={null}
                        visible={modalOpen}
                        onOk={closeModal}
                        onCancel={closeModal}
                        closable={true}
                        width={1400}
                        style={{minWidth:'1300px'}}
                        footer={null}

                    >
                        <div 
                            className="modal_container"
                        >
                            <div className="modal_adsense">
                                <Adsense
                                    client='ca-pub-7183258811881624'
                                    slot='5993734338'
                                    style={{ width: 90, height: 728 }}
                                />
                            </div>
                            <div 
                                style={{ 
                                    height: '770px', 
                                    lineHeight: '770px', 
                                    verticalAlign: 'middle', 
                                    width: '1300px', 
                                    marginLeft: 'auto', 
                                    marginRight: 'auto',
                                    position:'relative'
                                }}
                            >
                                <div
                                    style={{
                                        position:'absolute',
                                        left:0,
                                        top:0,
                                        zIndex:1000,
                                        color:'white'
                                    }}
                                >
                                    <ArrowLeftOutlined 
                                        style={{
                                            fontSize:'30px',
                                            margin:'5px'
                                        }}
                                        className='arrow_btn'
                                        onClick={e => changeMainLeft()}
                                    />
                                </div>
                                    <img
                                        src={selectedItems.listImage.mainImage}
                                        alt=""
                                        className="modal_image"
                                    />
                                <div
                                    style={{
                                        position:'absolute',
                                        right:0,
                                        top:0,
                                        zIndex:1000,
                                        color:'white'
                                    }}
                                >
                                    <ArrowRightOutlined 
                                        style={{
                                            fontSize:'30px',
                                            margin:'5px'
                                        }}
                                        className='arrow_btn'
                                        onClick={e => changeMainRight()}
                                    />
                                </div>
                            </div>

                            <div className="modal_adsense">
                                <Adsense
                                    client='ca-pub-7183258811881624'
                                    slot='5993734338'
                                    style={{ width: 90, height: 728 }}
                                />
                            </div>
                        </div>
                    </Modal>
                    : null
            }

        </div>
    )
}

export default Folder;