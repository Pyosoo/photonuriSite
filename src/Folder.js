import React, { useEffect, useState } from 'react';
import queryString from 'query-string';

function Folder({location, match}){

    const [code, setCode] = useState(location.pathname.split('/')[location.pathname.split('/').length-1])

    useEffect(()=>{
        // fetchAll Item by code
        console.log(code)
    },[])

    return(
        <div>
            {code}
        </div>
    )
}

export default Folder;