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
                        <h4>Giảm giá: {rank?.discount_rate}</h4>
                        <h4>Phí tối thiểu: {rank?.min_spending}</h4>
                        <h4>Mô tả: {rank?.description}</h4>
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
