import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import CustomModal from './CustomModal';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { Input, Select, Button, Modal } from 'antd';
import 'antd/dist/antd.css';

function Folder({ location, match }) {
    const history = useHistory();

    const [code, setCode] = useState(location.pathname.split('/')[location.pathname.split('/').length - 1])
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState([1])
    const [selectedItems, setSelectedItems] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false)
    }


    async function GetItems() {
        const res = await axios.post('http://61.100.186.15:5000/searchItems', {
            "code": code,
            "page": 1,
        })
        if (res.data.success) {
            console.log(res);
            console.log(res.data.data.items)
            setItems(res.data.data.items)
        }
    }

    useEffect(() => {
        GetItems()
    }, [])

    return (
        <div className="photo_container">
            <div style={{ marginTop: '50px', marginBottom: '50px' }}>
                {
                    items.length > 0 ?
                        items.map(item => {
                            return (
                                <div className="photo_item" onClick={e => {
                                    setSelectedItems(item);
                                    setModalOpen(true)
                                }}>
                                    <img src={item.image} className="photo_img" />
                                    <p>{item.title}</p>
                                </div>
                            )
                        })
                        :
                        <div style={{ marginTop: '150px', marginBottom: '150px', textAlign: 'center' }}>
                            <p >해당 카테고리에 맞는 사진이 없습니다. 다른 카테고리를 선택해주세요.</p>
                        </div>
                }
                <Button style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '50px' }} onClick={e => history.push("/")}>처음으로</Button>
            </div>



            {
                selectedItems ?
                    <Modal
                        title={selectedItems.title}
                        visible={modalOpen}
                        onOk={closeModal}
                        onCancel={closeModal}
                        width={900}
                        footer={
                            selectedItems ?
                                <div style={{ textAlign: 'center' }}>
                                    {
                                        selectedItems.links.adobestock.length > 0 ?
                                            <a style={{ textDecoration: 'none', fontWeight: '800', marginLeft: '10px', marginRight: '10px' }} href={selectedItems.links.adobestock} target="_blank">adobeStock</a>
                                            :
                                            null
                                    }
                                    {
                                        selectedItems.links.istockphoto.length > 0 ?
                                            <a style={{ textDecoration: 'none', fontWeight: '800', marginLeft: '10px', marginRight: '10px' }} href={selectedItems.links.istockphoto} target="_blank">istockphoto</a>
                                            :
                                            null
                                    }
                                    {
                                        selectedItems.links.shutterstock.length > 0 ?
                                            <a style={{ textDecoration: 'none', fontWeight: '800', marginLeft: '10px', marginRight: '10px' }} href={selectedItems.links.shutterstock} target="_blank">shutterstock</a>
                                            :
                                            null
                                    }
                                </div>
                                :
                                null
                        }

                    >
                        <div>
                            <img src={selectedItems.image} className="modal_image" />
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