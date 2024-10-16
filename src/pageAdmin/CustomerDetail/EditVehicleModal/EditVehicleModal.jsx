import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from './EditVehicleModal.module.css';

const EditVehicleModal = ({ vehicle, show, onHide, onUpdate }) => {
    const [formData, setFormData] = useState({
        license_plate: '',
        manufacturer: '',
        model: '',
        year: '',
        color: '',
    });

    useEffect(() => {
        if (vehicle) {
            setFormData({
                license_plate: vehicle.license_plate || '',
                manufacturer: vehicle.manufacturer || '',
                model: vehicle.model || '',
                year: vehicle.year || '',
                color: vehicle.color || '',
            });
        }
    }, [vehicle]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...vehicle, ...formData }); // Cập nhật thông tin xe
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className={styles.customerTitle}>Chỉnh sửa thông tin xe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {vehicle ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className={styles.vehicleGroup} controlId="license_plate">
                            <Form.Label className={styles.vehicleLabel}>Biển số xe</Form.Label>
                            <Form.Control
                                className={styles.vehicleControl}
                                type="text"
                                name="license_plate"
                                value={formData.license_plate}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className={styles.vehicleGroup} controlId="manufacturer">
                            <Form.Label className={styles.vehicleLabel}>Hãng</Form.Label>
                            <Form.Control
                                className={styles.vehicleControl}
                                type="text"
                                name="manufacturer"
                                value={formData.manufacturer}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className={styles.vehicleGroup} controlId="model">
                            <Form.Label className={styles.vehicleLabel}>Model</Form.Label>
                            <Form.Control
                                className={styles.vehicleControl}
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className={styles.vehicleGroup} controlId="year">
                            <Form.Label className={styles.vehicleLabel}>Năm sản xuất</Form.Label>
                            <Form.Control
                                className={styles.vehicleControl}
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className={styles.vehicleGroup} controlId="color">
                            <Form.Label className={styles.vehicleLabel}>Màu sắc</Form.Label>
                            <Form.Control
                                className={styles.vehicleControl}
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div className={styles.btn}>
                            <Button className={`mt-2 ${styles.vehicleBtn}`} variant="primary" type="submit">
                                Cập nhật
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default EditVehicleModal;
