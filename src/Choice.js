
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Input, Select, Button, Modal, Pagination } from 'antd';




function Choice(props) {

    const [cateData, setCateData] = useState({});
    const [mainData, setMainData] = useState([]);
    const [cat1, setcat1] = useState(0);
    const [cat2, setcat2] = useState(0);
    const [cat3, setcat3] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const [fetchDataTotal, setFetchDataTotal] = useState(0);


    async function fetchCategories() {
        const res = await axios.get('http://61.100.186.15:5000/getCategories')
        if (res.data && res.data.success) {
            setCateData(res.data.data)
        }
    }

    async function fetchExposeData() {
        const res = await axios.post('http://61.100.186.15:5000/searchAll', { 'page': pageNum })
        if (res.data && res.data.success) {
            setFetchDataTotal(res.data.data.total)
            setMainData(res.data.data.items)
        }
    }


    useEffect(() => {
        fetchCategories()
    }, [])
    useEffect(() => {
        fetchExposeData()
    }, [pageNum])


    if (mainData.length !== 0) {
        return (
            <div className="cat1_div">
                {
                    mainData.map(item => {
                        return (
                            <Link
                                to={{
                                    pathname: `/folder/${item.code}`,
                                    state: {
                                        categoryData: cateData
                                    }
                                }}
                                style={{ color: 'black', marginRight: '3%' }}
                            >
                                <div className="cat1_item">
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="cat1_img"
                                        onClick={e => {
                                            setcat1(item.code);
                                            window.scrollTo(0, 300)
                                        }}
                                    />
                                    <p className="cat1_title" >{item.title}</p>
                                </div>
                            </Link>
                        )
                    })
                }
               
                <div style={{ width:'100%', marginLeft: 'auto', marginRight: 'auto', display: 'block', textAlign: 'center', marginTop: '70px', marginBottom:'30px' }}>
                    <Pagination
                        current={pageNum}
                        onChange={(page, pageSize) => setPageNum(page)}
                        total={fetchDataTotal}
                        pageSize={20}
                    />
                </div>
            </div>
        )
    } else return <div>no Data</div>


}

export default Choice;