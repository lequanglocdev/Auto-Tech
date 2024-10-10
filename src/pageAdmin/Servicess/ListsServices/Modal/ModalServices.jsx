import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalServices = ({ services, ...props }) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Thông tin khách hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {services ? (
                    <>
                        <h4>Loại dịch vụ: {services?.service_code}</h4>
                        <h4>Tên dịch vụ : {services?.name}</h4>
                        <h4>Mô tả: {services?.description}</h4>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalServices;
