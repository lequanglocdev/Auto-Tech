import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalEmployees = ({ user, ...props }) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Thông tin chi tiết nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user ? (
                    <>
                        <h4>Tên: {user?.name}</h4>
                        <h4>Email: {user?.email}</h4>
                        <h4>Điện thoại: {user.phone_number}</h4>
                        <h4>Vai trò: {user?.role}</h4>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEmployees;
