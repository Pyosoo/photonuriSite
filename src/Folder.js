import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import CustomModal from './CustomModal';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { Input, Select, Button, Modal, Pagination } from 'antd';
import 'antd/dist/antd.css';

function Folder({ location, match }) {
    const history = useHistory();

    const [code, setCode] = useState(location.pathname.split('/')[location.pathname.split('/').length - 1])
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState([1])
    const [totalLength, setTotalLength] = useState(0);
    const [selectedItems, setSelectedItems] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [pageNum, setPageNum] = useState(1);


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
        }
    }

    const changePageNum = num => {
        setPageNum(num);
    }


    useEffect(() => {
        GetItems()
    }, [pageNum])

    return (
        <div className="photo_container">
            <div style={{ marginTop: '50px', marginBottom: '50px', display: 'flex', flexWrap:'wrap', justifyContent:'center' }}>
                {
                    items.length > 0 ?
                        items.map(item => {
                            return (
                                <div className="photo_item" onClick={e => {
                                    setSelectedItems(item);
                                    setModalOpen(true)
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
            <div style={{textAlign:'center'}}>
                <Pagination
                    current={pageNum}
                    onChange={(page, pageSize) => changePageNum(page)}
                    total={totalLength}
                    pageSize={10}
                />
                <Button style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '50px', marginBottom: '50px' }} onClick={e => history.push("/")}>처음으로</Button>

            </div>


            {
                selectedItems ?
                    <Modal
                        title={selectedItems.title}
                        visible={modalOpen}
                        onOk={closeModal}
                        onCancel={closeModal}
                        width={1100}
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
                                </div>
                                :
                                null
                        }

                    >
                        <div>
                            <img
                                src={selectedItems.image}
                                alt=""
                                className="modal_image"
                            />
                        </div>
                        <div className="modal_content">
                            {selectedItems.content}
                        </div>
                    </Modal>
                    : null
            }

        </div>
    )
}

export default Folder;