import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddVehicleModal = ({ show, onHide, onAddVehicle }) => {
    const [licensePlate, setLicensePlate] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [color, setColor] = useState('');

    const handleAddVehicle = () => {
        const newVehicle = {
            _id: Math.random().toString(36).substr(2, 9), // Tạo ID ngẫu nhiên cho xe
            license_plate: licensePlate,
            manufacturer,
            model,
            year,
            color,
        };
        onAddVehicle(newVehicle);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm xe mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Biển số xe</Form.Label>
                        <Form.Control
                            type="text"
                            value={licensePlate}
                            onChange={(e) => setLicensePlate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hãng xe</Form.Label>
                        <Form.Control
                            type="text"
                            value={manufacturer}
                            onChange={(e) => setManufacturer(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mẫu xe</Form.Label>
                        <Form.Control
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Năm sản xuất</Form.Label>
                        <Form.Control
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Màu sắc</Form.Label>
                        <Form.Control
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Đóng</Button>
                <Button variant="primary" onClick={handleAddVehicle}>Thêm xe</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddVehicleModal;
