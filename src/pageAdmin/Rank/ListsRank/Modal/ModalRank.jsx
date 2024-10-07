import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalRank = ({ rank, ...props }) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Thông tin khách hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {rank ? (
                    <>
                        <h4>Tên: {rank?.rank_name}</h4>
                        <p>Email: {rank?.discount_rate}</p>
                        <p>Điện thoại: {rank.min_spending}</p>
                        <p>Địa chỉ: {rank.description}</p>
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

export default ModalRank;
