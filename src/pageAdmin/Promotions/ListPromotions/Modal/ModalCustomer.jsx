import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalCustomer = ({ user, onUpdateUser, ...props }) => {
    return (
        <>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Thông tin khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {user ? (
                        <>
                            <h4>Tên: {user?.customer?.name}</h4>
                            <p>Email: {user?.customer?.email}</p>
                            <p>Điện thoại: {user?.customer?.phone_number}</p>
                            <p>Địa chỉ: {user?.customer?.address}</p>
                            <p>Tổng chi tiêu: {user?.customer?.total_spending}</p>
                            <h5>Phương tiện:</h5>
                            <ul>
                                {Array.isArray(user.vehicles) && user.vehicles.length > 0 ? (
                                    user.vehicles.map((vehicle) => (
                                        <li key={vehicle._id}>
                                            {vehicle.manufacturer} {vehicle.model} - {vehicle.license_plate} (
                                            {vehicle.year})
                                        </li>
                                    ))
                                ) : (
                                    <li>Không có phương tiện nào.</li>
                                )}
                            </ul>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCustomer;
