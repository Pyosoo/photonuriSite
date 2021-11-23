import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";

function Choice(props) {

    const [cat1, setcat1] = useState(0);
    const [cat2, setcat2] = useState(0);
    const [cat3, setcat3] = useState(0);


    if (cat1 === 0) {
        return (
            <div>
                <p onClick={e => setcat1(1)}>1</p>
                <p onClick={e => setcat1(2)}>2</p>
                <p onClick={e => setcat1(3)}>3</p>
                <p onClick={e => setcat1(4)}>4</p>
                <p onClick={e => setcat1(5)}>5</p>
                <p onClick={e => setcat1(6)}>6</p>
                <button onClick={e => console.log(cat1,cat2,cat3)}>첵</button>
            </div>
        )
    }
    else if (cat2 === 0) {
        return (
            <div>
                <p onClick={e => setcat2(5)}>5</p>
                <p onClick={e => setcat2(6)}>6</p>
                <p onClick={e => setcat2(7)}>7</p>
                <p onClick={e => setcat2(8)}>8</p>
                <p onClick={e => setcat2(9)}>9</p>
                <p onClick={e => setcat2(10)}>10</p>
                <button onClick={e => setcat1(0)}>뒤로가기</button>
                <button onClick={e => console.log(cat1,cat2,cat3)}>첵</button>
            </div>
        )

    } else {
        return (
            <div>
                <Link to={`/folder/11`}><p onClick={e => setcat3(11)}>11</p></Link>
                <Link to={`/folder/12`}><p onClick={e => setcat3(12)}>12</p></Link>
                <Link to={`/folder/13`}><p onClick={e => setcat3(13)}>13</p></Link>
                <Link to={`/folder/14`}><p onClick={e => setcat3(14)}>14</p></Link>
                <Link to={`/folder/15`}><p onClick={e => setcat3(15)}>15</p></Link>
                <Link to={`/folder/16`}><p onClick={e => setcat3(16)}>16</p></Link>
                <button onClick={e => setcat2(0)}>뒤로가기</button>
                <button onClick={e => console.log(cat1,cat2,cat3)}>첵</button>
            </div>
        )
    }
}

export default Choice;