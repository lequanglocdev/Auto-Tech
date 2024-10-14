import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ConfirmDeleteModal.module.css'
const ConfirmDeleteModal = ({ show, onHide, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className={styles.employeeTitle}>Xác nhận xóa</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.employeeLabel}>
                <p>Bạn có chắc chắn muốn xóa nhân viên này không?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className={styles.employeeBtn} onClick={onHide}>Hủy</Button>
                <Button variant="danger" className={styles.employeeBtn} onClick={onConfirm}>Xóa</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteModal;
