import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ConfirmCancelModal.module.css'
const ConfirmCancelModal = ({ show, onHide, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className={styles.customerTitle}>Xác nhận hủy</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.customerLabel}>
                <p>Bạn muốn hủy lịch này không?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className={styles.customerBtn} onClick={onHide}>Không</Button>
                <Button variant="danger" className={styles.customerBtn} onClick={onConfirm}>Hủy</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmCancelModal;
