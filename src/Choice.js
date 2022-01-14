
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
        const res = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/getCategories`)
        if (res.data && res.data.success) {
            setCateData(res.data.data)
        }
    }

    async function fetchExposeData() {
        const res = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/searchAll`, { 'page': pageNum, 'limit': 10 })
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
        console.log(mainData)
        return (
            <>
            <div className="main_line">
                {/* 메인1 */}
                <div style={{ display: 'flex', width: '1300px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <div style={{ width: '49%', height: '460px', marginRight: 'auto' }}>
                        {
                            mainData[0] ?
                                <Link
                                    to={{
                                        pathname: `/folder/${mainData[0].code}`,
                                        state: {
                                            categoryData: cateData,
                                            ID: mainData[0]._id
                                        }
                                    }}
                                    className='mainImage0'
                                >
                                    <img
                                        src={mainData[0].listImage.listImage}
                                        alt=""
                                        className='mainImgBig'
                                        onClick={e => {
                                            setcat1(mainData[0].code);
                                            window.scrollTo(0, 300)
                                        }}
                                    />
                                </Link>
                                :
                                null
                        }

                    </div>
                    <div style={{ width: '49%' }}>
                        <div style={{ display: 'flex', height: '230px' }}>
                            {
                                mainData[1] ?
                                    <Link
                                        to={{
                                            pathname: `/folder/${mainData[1].code}`,
                                            state: {
                                                categoryData: cateData,
                                                ID: mainData[1]._id
                                            }
                                        }}
                                        className='mainImage1'
                                    >
                                        <img
                                            src={mainData[1].listImage.listImage}
                                            alt=""
                                            className='mainImgSmall'
                                            onClick={e => {
                                                setcat1(mainData[1].code);
                                                window.scrollTo(0, 300)
                                            }}
                                        />
                                    </Link>
                                    : null
                            }
                            {
                                mainData[2] ?
                                    <Link
                                        to={{
                                            pathname: `/folder/${mainData[2].code}`,
                                            state: {
                                                categoryData: cateData,
                                                ID: mainData[2]._id
                                            }
                                        }}
                                        className='mainImage1'
                                    >
                                        <img
                                            src={mainData[2].listImage.listImage}
                                            alt=""
                                            className='mainImgSmall'
                                            onClick={e => {
                                                setcat1(mainData[2].code);
                                                window.scrollTo(0, 300)
                                            }}
                                        />
                                    </Link>
                                    :
                                    null
                            }

                        </div>
                        <div style={{ display: 'flex', height: '230px' }}>
                            {
                                mainData[3] ?
                                    <Link
                                        to={{
                                            pathname: `/folder/${mainData[3].code}`,
                                            state: {
                                                categoryData: cateData,
                                                ID: mainData[3]._id
                                            }
                                        }}
                                        className='mainImage1'
                                    >
                                        <img
                                            src={mainData[3].listImage.listImage}
                                            alt=""
                                            className='mainImgSmall'
                                            onClick={e => {
                                                setcat1(mainData[1].code);
                                                window.scrollTo(0, 300)
                                            }}
                                        />
                                    </Link>
                                    :
                                    null
                            }
                            {
                                mainData[4] ?
                                    <Link
                                        to={{
                                            pathname: `/folder/${mainData[4].code}`,
                                            state: {
                                                categoryData: cateData,
                                                ID: mainData[4]._id
                                            }
                                        }}
                                        className='mainImage1'
                                    >
                                        <img
                                            src={mainData[4].listImage.listImage}
                                            alt=""
                                            className='mainImgSmall'
                                            onClick={e => {
                                                setcat1(mainData[4].code);
                                                window.scrollTo(0, 300)
                                            }}
                                        />
                                    </Link>
                                    :
                                    null
                            }

                        </div>
                    </div>
                </div>

                {/* 메인2 */}
                <div style={{ display: 'flex', width: '1300px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <div style={{ width: '49%', marginRight: 'auto' }}>
                        <div style={{ display: 'flex', height: '230px' }}>
                            {
                                mainData[5] ?
                                    <Link
                                        to={{
                                            pathname: `/folder/${mainData[5].code}`,
                                            state: {
                                                categoryData: cateData,
                                                ID: mainData[5]._id
                                            }
                                        }}
                                        className='mainImage1'
                                    >
                                        <img
                                            src={mainData[5].listImage.listImage}
                                            alt=""
                                            className='mainImgSmall'
                                            onClick={e => {
                                                setcat1(mainData[5].code);
                                                window.scrollTo(0, 300)
                                            }}
                                        />
                                    </Link>
                                    :
                                    null
                            }
                            {
                                mainData[6] ?
                                    <Link
                                        to={{
                                            pathname: `/folder/${mainData[6].code}`,
                                            state: {
                                                categoryData: cateData,
                                                ID: mainData[6]._id
                                            }
                                        }}
                                        className='mainImage1'
                                    >
                                        <img
                                            src={mainData[6].listImage.listImage}
                                            alt=""
                                            className='mainImgSmall'
                                            onClick={e => {
                                                setcat1(mainData[6].code);
                                                window.scrollTo(0, 300)
                                            }}
                                        />
                                    </Link>
                                    :
                                    null
                            }

                        </div>
                        <div style={{ display: 'flex', height: '230px' }}>
                            {
                                mainData[7] ?
                                    <Link
                                        to={{
                                            pathname: `/folder/${mainData[7].code}`,
                                            state: {
                                                categoryData: cateData,
                                                ID: mainData[7]._id
                                            }
                                        }}
                                        className='mainImage1'
                                    >
                                        <img
                                            src={mainData[7].listImage.listImage}
                                            alt=""
                                            className='mainImgSmall'
                                            onClick={e => {
                                                setcat1(mainData[7].code);
                                                window.scrollTo(0, 300)
                                            }}
                                        />
                                    </Link>
                                    :
                                    null
                            }
                            {
                                mainData[8] ?
                                    <Link
                                        to={{
                                            pathname: `/folder/${mainData[8].code}`,
                                            state: {
                                                categoryData: cateData,
                                                ID: mainData[8]._id
                                            }
                                        }}
                                        className='mainImage1'
                                    >
                                        <img
                                            src={mainData[8].listImage.listImage}
                                            alt=""
                                            className='mainImgSmall'
                                            onClick={e => {
                                                setcat1(mainData[8].code);
                                                window.scrollTo(0, 300)
                                            }}
                                        />
                                    </Link>
                                    :
                                    null
                            }

                        </div>
                    </div>
                    <div style={{ width: '49%', height: '460px' }}>
                        {
                            mainData[9] ?
                                <Link
                                    to={{
                                        pathname: `/folder/${mainData[9].code}`,
                                        state: {
                                            categoryData: cateData,
                                            ID: mainData[9]._id
                                        }
                                    }}
                                    className='mainImage0'
                                >
                                        <img
                                            src={mainData[9].listImage.listImage}
                                            alt=""
                                            className='mainImgBig'
                                            onClick={e => {
                                                setcat1(mainData[9].code);
                                                window.scrollTo(0, 300)
                                            }}
                                        />
                                </Link>
                                :
                                null
                        }

                    </div>
                </div>



                <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', display: 'block', textAlign: 'center', marginTop: '70px', marginBottom: '30px' }}>
                    <Pagination
                        current={pageNum}
                        onChange={(page, pageSize) => setPageNum(page)}
                        total={fetchDataTotal}
                        pageSize={20}
                    />
                </div>
            </div>
            <div className='mobile_Notice'>
            </div>
        </>
        )
    } else return (
        <>
            <div className='pc_notice' style={{ height: '500px', lineHeight: '500px', textAlign: 'center', fontSize: '25px', fontWeight: '600' }}>사진을 업로드해주세요.</div>
            <div className='mobile_Notice'>
            </div>
        </>
    )


}

export default Choice;