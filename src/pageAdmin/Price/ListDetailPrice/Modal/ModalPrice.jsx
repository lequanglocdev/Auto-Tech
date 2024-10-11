import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalPrice = ({ price, ...props }) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Thông tin Bảng giá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {price ? (
                    <>
                        <h4>Loại xe: {price.vehicle_type_id?.vehicle_type_name || 'Không có thông tin'}</h4>
                        <h4>Dịch vụ: {price.service_id?.name || 'Không có dịch vụ'}</h4>
                        <h4>Giá: {price.price} VND</h4>
                        <h4>Mô tả xe: {price.vehicle_type_id?.description || 'Không có mô tả'}</h4>
                        <h4>Mô tả dịch vụ: {price.service_id?.description || 'Không có mô tả'}</h4>
                        <h4>ID Bảng Giá: {price.price_header_id}</h4>
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

export default ModalPrice;
