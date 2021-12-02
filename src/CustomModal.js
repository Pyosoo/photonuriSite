import React from 'react';
import { Modal, Button } from 'antd';

function CustomModal(props){

    console.log(props)

    return(
        <Modal 
            title="Basic Modal" 
            visible={props.visible} 
            onOk={props.closeModal} 
            onCancel={props.closeModal}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default CustomModal;