import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from './EditEmployeeModal.module.css';
const EditEmployeeModal = ({ user, show, onHide, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        role: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone_number: user.phone_number || '',
                role: user.role || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...user, ...formData });
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className={styles.employeeTitle}>Cập nhật thông tin nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className={styles.employeeGroup} controlId="name">
                            <Form.Label className={styles.employeeLabel}>Tên</Form.Label>
                            <Form.Control
                                className={styles.employeeControl}
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className={styles.employeeGroup} controlId="email">
                            <Form.Label className={styles.employeeLabel}>Email</Form.Label>
                            <Form.Control
                                className={styles.employeeControl}
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className={styles.employeeGroup} controlId="phone_number">
                            <Form.Label className={styles.employeeLabel}>Điện thoại</Form.Label>
                            <Form.Control
                                className={styles.employeeControl}
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <div className={styles.btn}>
                            <Button className={`mt-2 ${styles.employeeBtn}`} variant="primary" type="submit">
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

export default EditEmployeeModal;
