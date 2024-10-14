import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalRank.module.css'
const ModalRank = ({ rank, ...props }) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className={styles.rankHeader} closeButton>
                <Modal.Title className={styles.rankTitle} id="contained-modal-title-vcenter">Thông tin chi tiết thứ hạng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {rank ? (
                    <>
                        <h4><strong>Thứ hạng</strong>: {rank?.rank_name}</h4>
                        <h4><strong>Giảm giá:</strong> {rank?.discount_rate}</h4>
                        <h4><strong>Phí tối thiểu:</strong> {rank?.min_spending}</h4>
                        <h4><strong>Mô tả:</strong> {rank?.description}</h4>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button className={styles.btn} onClick={props.onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRank;
