import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import UrlImageDownloader from 'react-url-image-downloader'
const fs = require('fs');
const https = require('https');
function Admin() {

    const [mode, setMode] = useState('add');    // add or update
    const [addedImg, setAddedImg] = useState('');
    const [addedTitle, setAddedTitle] = useState('');
    const [addedcat1, setAddedCat1] = useState('');
    const [addedcat2, setAddedCat2] = useState('');
    const [addedcat3, setAddedCat3] = useState('');
    const [addedcontent, setAddedContent] = useState('');
    const [addedImageUrl, setAddedImgUrl] = useState('');

    const cookies = new Cookies();


    function base64toBlob(base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = base64Data;
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);
    
        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);
    
            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        console.log('success')
        return new Blob(byteArrays, { type: contentType });
    }

    function saveFile(){
        https.get(addedImageUrl,(res) => {
            // Image will be stored at this path
            const path = `C:\Users\User\Desktop>/files/img111.png`; 
            const filePath = fs.createWriteStream(path);
            res.pipe(filePath);
            filePath.on('finish',() => {
                filePath.close();
                console.log('Download Completed'); 
            })
        })
    }

    if(cookies.get('loginState') === 'true'){
        return (
            <div>
                <button onClick={e => setMode('add')}>추가하기</button>
                <button onClick={e => setMode('update')}>수정하기</button>
                <div className="admin_body">
                {
                    mode === "add" ?
                        <div className="admin_add">
                            <div className="admin_add_left">
                                <input className="admin_add_img_input" type="file" onChange={e => {
                                    const regexp = /\.(gif|jpg|jpeg|tiff|png)$/i;
                                    let reader = new FileReader();
                                    let file = e.target.files[0];
                                    let result = '';
                                    if (file && !regexp.test(file.name)) {
                                      return null;
                                    }
                                
                                    if (file) {
                                      reader.readAsDataURL(file);
                                      reader.onloadend = () => {
                                        let base64data = reader.result;
                                        // result = base64toBlob(base64data, "image/png")
                                        let blob = new Blob([new ArrayBuffer(base64data)], { type: "image/png" });
                                        // let resultFile = new File([result], "ppss");
                                                            // var csvURL = window.URL.createObjectURL(resultFile);
                                                            // let tempLink = document.createElement('a');
                                                            // tempLink.href = csvURL;
                                                            // tempLink.setAttribute('download', 'tt.png');
                                                            // tempLink.click();
                                        let resultURL = URL.createObjectURL(blob);
                                        document.getElementById("image").src = resultURL;
                                        setAddedImgUrl(resultURL)
                                    }
                                }}}
                                 />
                                <button onClick={e => console.log(addedImageUrl, typeof(addedImageUrl))}>확인</button>
                                <img src="" id="image" />
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
    } else {
        return(
            <div className="wrongwayText">잘못된 접근입니다. 다시 로그인해주세요.</div>
        )
    }
    

}

export default Admin;