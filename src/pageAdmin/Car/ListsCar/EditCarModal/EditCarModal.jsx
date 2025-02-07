import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from './EditCarModal.module.css';

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
                <Modal.Title className={styles.customerTitle}>Cập nhật thông tin loại xe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {car ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className={styles.customerGroup} controlId="vehicle_type_name">
                            <Form.Label className={styles.customerLabel}>Tên</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="text"
                                name="vehicle_type_name"
                                value={formData.vehicle_type_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className={styles.customerGroup} controlId="description">
                            <Form.Label className={styles.customerLabel}>Mô tả</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <div className={styles.btn}>
                            <Button className={`mt-2 ${styles.customerBtn}`} variant="primary" type="submit">
                                Cập nhật
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <p>Loading</p>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default EditCarModal;
