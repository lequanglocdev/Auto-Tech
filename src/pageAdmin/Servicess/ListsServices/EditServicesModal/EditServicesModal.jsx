import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from './EditServicesModal.module.css';

const EditServicesModal = ({ service, show, onHide, onUpdate }) => {
    const [formData, setFormData] = useState({
        service_code: '',
        name: '',
        description: '',
    });
    useEffect(() => {
        if (service) {
            setFormData({
                service_code: service.service_code || '',
                name: service.name || '',
                description: service.description || '',
            });
        }
    }, [service]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...service, ...formData });
    };

    const handleClose = () => {
        setFormData({
            service_code: service?.service_code || '',
            name: service?.name || '',
            description: service?.description || '',
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className={styles.customerTitle}>Cập nhật thông tin dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {service ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className={styles.customerGroup} controlId="name">
                            <Form.Label className={styles.customerLabel}>Loại dịch vụ</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="text"
                                name="service_code"
                                value={formData.service_code}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className={styles.customerGroup} controlId="name">
                            <Form.Label className={styles.customerLabel}>Tên dịch vụ</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className={styles.customerGroup} controlId="description">
                            <Form.Label className={styles.customerLabel}>Mô tả</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                as="textarea"
                                rows={3}
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
                    <p>Loading...</p>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default EditServicesModal;
