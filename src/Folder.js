import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import CustomModal from './CustomModal';
import axios from 'axios';

function Folder({location, match}){

    const [code, setCode] = useState(location.pathname.split('/')[location.pathname.split('/').length-1])
    const [modalVisible, setModalVisible] = useState(false);
    const [items,setItems] = useState([1])

    const openModal = () => {
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false)
    }


    async function GetItems(){
        const res = await axios.post('http://61.100.186.15:5000/searchItems', {
            "code": code,
            "page": 1,
        })
        if(res.data.success){
            console.log(res);
            console.log(res.data.data.items)
            setItems(res.data.data.items)
        }
    }

    useEffect(()=>{
        GetItems()
    },[])

    return(
        <div>
            <p onClick={e => setModalVisible(true)}>{code}</p>
            {
                items.map(item => {
                    return(
                        <p>{item._id}</p>
                    )
                })
            }
        </div>
    )
}

export default Folder;