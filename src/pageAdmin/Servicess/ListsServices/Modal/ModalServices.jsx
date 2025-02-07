import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalServices.module.css';

const ModalServices = ({ services, ...props }) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className={styles.rankHeader} closeButton>
                <Modal.Title className={styles.rankTitle} id="contained-modal-title-vcenter">
                    Thông tin dịch vụ
                </Modal.Title>
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
                <Button className={styles.btn} onClick={props.onHide}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalServices;
