import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const EditCarModal = ({ car, show, onHide, onUpdate }) => {
    const [formData, setFormData] = useState({
      vehicle_type_name: '',
      description: '',
    });
    useEffect(() => {
        if (car) {
            setFormData({
                vehicle_type_name: car.vehicle_type_name || '',
                description: car.description || '',
            });
        }
    }, [car]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...car, ...formData });
    };
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin khách hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {car ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="vehicle_type_name">
                            <Form.Label>Tên</Form.Label>
                            <Form.Control type="text" name="vehicle_type_name" value={formData.vehicle_type_name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-2">
                            Cập nhật
                        </Button>
                    </Form>
                ) : (
                    <p>Loading</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditCarModal;
