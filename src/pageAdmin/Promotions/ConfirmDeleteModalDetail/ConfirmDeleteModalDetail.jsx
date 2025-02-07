import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ConfirmDeleteModalDeatail.module.css'
const ConfirmDeleteModalDetail = ({ show, onHide, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
            <Modal.Title className={styles.customerTitle}>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.customerLabel}>
            <p>Bạn muốn xóa dòng khuyến mãi này không?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" className={styles.customerBtn} onClick={onHide}>Hủy</Button>
            <Button variant="danger" className={styles.customerBtn}  onClick={onConfirm}>Xóa</Button>
        </Modal.Footer>
    </Modal>
    );
};

export default ConfirmDeleteModalDetail;
