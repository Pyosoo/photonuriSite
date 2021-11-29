import { Modal, Button } from 'antd';

function CustomModal(props){

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return(
        <Modal 
            title="Basic Modal" 
            visible={props.modalVisible} 
            onOk={handleOk} 
            onCancel={handleCancel}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default CustomModal;