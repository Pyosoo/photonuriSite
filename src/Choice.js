
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Input, Select, Button, Modal, Pagination } from 'antd';


//  Choice is 메인화면

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
        const res = await axios.post('http://61.100.186.15:5000/searchAll', { 'page': pageNum, 'limit': 10 })
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
            <div className="main_line">

                {/* 메인1 */}
                <div style={{display:'flex', width:'1300px',  marginLeft:'auto', marginRight:'auto'}}>
                    <div style={{width:'50%', height:'450px'}}>
                        <Link
                            to={{
                                pathname: `/folder/${mainData[0].code}`,
                                state: {
                                    categoryData: cateData
                                }
                            }}
                            className='mainImage0'
                        >
                            <div style={{width:'100%'}}>
                                <img
                                    // src={mainData[0].image}
                                    src="http://www.photonuri.com/wp-content/uploads/2020/11/1210202RF017-400x250.jpg"
                                    alt=""
                                    style={{width:'100%', marginTop:'4px'}}
                                    onClick={e => {
                                        setcat1(mainData[0].code);
                                        window.scrollTo(0, 300)
                                    }}
                                />
                            </div>
                        </Link>
                    </div>
                    <div style={{width:'50%'}}>
                        <div style={{display:'flex'}}>
                            <Link
                                to={{
                                    pathname: `/folder/${mainData[1].code}`,
                                    state: {
                                        categoryData: cateData
                                    }
                                }}
                                className='mainImage1'
                            >
                                <div className="cat1_item">
                                    <img
                                        // src={mainData[1].image}
                                    src="http://www.photonuri.com/wp-content/uploads/2020/11/1210202RF017-400x250.jpg"
                                        alt=""
                                        style={{width:'100%'}}
                                        onClick={e => {
                                            setcat1(mainData[1].code);
                                            window.scrollTo(0, 300)
                                        }}
                                    />
                                </div>
                            </Link>
                            <Link
                                to={{
                                    pathname: `/folder/${mainData[2].code}`,
                                    state: {
                                        categoryData: cateData
                                    }
                                }}
                                className='mainImage1'
                            >
                                <div className="cat1_item">
                                    <img
                                        // src={mainData[2].image}
                                    src="http://www.photonuri.com/wp-content/uploads/2020/11/1210202RF017-400x250.jpg"
                                        alt=""
                                        style={{width:'100%'}}
                                        onClick={e => {
                                            setcat1(mainData[2].code);
                                            window.scrollTo(0, 300)
                                        }}
                                    />
                                </div>
                            </Link>
                        </div>
                        <div style={{display:'flex'}}>
                            <Link
                                to={{
                                    pathname: `/folder/${mainData[1].code}`,
                                    state: {
                                        categoryData: cateData
                                    }
                                }}
                                className='mainImage1'
                            >
                                <div>
                                    <img
                                        // src={mainData[1].image}
                                    src="http://www.photonuri.com/wp-content/uploads/2020/11/1210202RF017-400x250.jpg"
                                        alt=""
                                        style={{width:'100%'}}
                                        onClick={e => {
                                            setcat1(mainData[1].code);
                                            window.scrollTo(0, 300)
                                        }}
                                    />
                                </div>
                            </Link>
                            <Link
                                to={{
                                    pathname: `/folder/${mainData[2].code}`,
                                    state: {
                                        categoryData: cateData
                                    }
                                }}
                                className='mainImage1'
                            >
                                <div>
                                    <img
                                        // src={mainData[2].image}
                                    src="http://www.photonuri.com/wp-content/uploads/2020/11/1210202RF017-400x250.jpg"
                                        alt=""
                                        style={{width:'100%'}}
                                        onClick={e => {
                                            setcat1(mainData[2].code);
                                            window.scrollTo(0, 300)
                                        }}
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 메인2 */}
                <div style={{display:'flex', width:'1300px', marginLeft:'auto', marginRight:'auto'}}>
                    <div style={{width:'50%'}}>
                        <div style={{display:'flex'}}>
                            <Link
                                to={{
                                    pathname: `/folder/${mainData[1].code}`,
                                    state: {
                                        categoryData: cateData
                                    }
                                }}
                                className='mainImage1'
                            >
                                <div className="cat1_item">
                                    <img
                                        // src={mainData[1].image}
                                    src="http://www.photonuri.com/wp-content/uploads/2020/11/1210202RF017-400x250.jpg"
                                        alt=""
                                        style={{width:'100%'}}
                                        onClick={e => {
                                            setcat1(mainData[1].code);
                                            window.scrollTo(0, 300)
                                        }}
                                    />
                                </div>
                            </Link>
                            <Link
                                to={{
                                    pathname: `/folder/${mainData[2].code}`,
                                    state: {
                                        categoryData: cateData
                                    }
                                }}
                                className='mainImage1'
                            >
                                <div className="cat1_item">
                                    <img
                                        // src={mainData[2].image}
                                    src="http://www.photonuri.com/wp-content/uploads/2020/11/1210202RF017-400x250.jpg"
                                        alt=""
                                        style={{width:'100%'}}
                                        onClick={e => {
                                            setcat1(mainData[2].code);
                                            window.scrollTo(0, 300)
                                        }}
                                    />
                                </div>
                            </Link>
                        </div>
                        <div style={{display:'flex'}}>
                            <Link
                                to={{
                                    pathname: `/folder/${mainData[1].code}`,
                                    state: {
                                        categoryData: cateData
                                    }
                                }}
                                className='mainImage1'
                            >
                                <div>
                                    <img
                                        // src={mainData[1].image}
                                    src="http://www.photonuri.com/wp-content/uploads/2020/11/1210202RF017-400x250.jpg"
                                        alt=""
                                        style={{width:'100%'}}
                                        onClick={e => {
                                            setcat1(mainData[1].code);
                                            window.scrollTo(0, 300)
                                        }}
                                    />
                                </div>
                            </Link>
                            <Link
                                to={{
                                    pathname: `/folder/${mainData[2].code}`,
                                    state: {
                                        categoryData: cateData
                                    }
                                }}
                                className='mainImage1'
                            >
                                <div>
                                    <img
                                        // src={mainData[2].image}
                                    src="http://www.photonuri.com/wp-content/uploads/2020/11/1210202RF017-400x250.jpg"
                                        alt=""
                                        style={{width:'100%'}}
                                        onClick={e => {
                                            setcat1(mainData[2].code);
                                            window.scrollTo(0, 300)
                                        }}
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div style={{width:'50%', height:'450px'}}>
                        <Link
                            to={{
                                pathname: `/folder/${mainData[0].code}`,
                                state: {
                                    categoryData: cateData
                                }
                            }}
                            className='mainImage0'
                        >
                            <div style={{width:'100%'}}>
                                <img
                                    // src={mainData[0].image}
                                    src="http://www.photonuri.com/wp-content/uploads/2020/11/1210202RF017-400x250.jpg"
                                    alt=""
                                    style={{width:'100%', marginTop:'4px'}}
                                    onClick={e => {
                                        setcat1(mainData[0].code);
                                        window.scrollTo(0, 300)
                                    }}
                                />
                            </div>
                        </Link>
                    </div>
                </div>


               
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