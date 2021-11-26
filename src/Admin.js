import React, { useState } from 'react';

function Admin() {

    const [mode, setMode] = useState('add');    // add or update

    const [addedImg, setAddedImg] = useState('');
    const [addedTitle, setAddedTitle] = useState('');
    const [addedcat1, setAddedCat1] = useState('');
    const [addedcat2, setAddedCat2] = useState('');
    const [addedcat3, setAddedCat3] = useState('');
    const [addedcontent, setAddedContent] = useState('');


    return (
        <div>
            <button onClick={e => setMode('add')}>추가하기</button>
            <button onClick={e => setMode('update')}>수정하기</button>
            <div className="admin_body">
            {
                mode === "add" ?
                    <div className="admin_add">
                        <div className="admin_add_left">
                            <input className="admin_add_img_input" type="file" onChange={e => console.log(e.target.value)} />
                        </div>
                        <div className="admin_add_right">
                            <input className="admin_add_right_input"  value={addedTitle} onChange={e=> setAddedTitle(e.target.value)}/>
                            <div>
                                <select value={addedcat1} onChange={e => setAddedCat1(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <select value={addedcat2} onChange={e => setAddedCat2(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <select value={addedcat3} onChange={e => setAddedCat3(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <input type="textarea" value={addedcontent} onChange={e => setAddedContent(e.target.value)} />
                        </div>
                    </div>
                    :
                    <div>
                        update
                    </div>
            }
            </div>
        </div>
    )

}

export default Admin;