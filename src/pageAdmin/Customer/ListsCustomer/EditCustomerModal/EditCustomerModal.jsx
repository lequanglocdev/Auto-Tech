import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from './EditCustomerModal.module.css';

const EditCustomerModal = ({ user, show, onHide, onUpdate }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        address: '',
        phone_number: '',
    });
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                name: user.name || '',
                address: user.address || '',
                phone_number: user.phone_number || '',
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
                <Modal.Title className={styles.customerTitle}>Cập nhật thông tin khách hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className={styles.customerGroup} controlId="email">
                            <Form.Label className={styles.customerLabel}>Email</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className={styles.customerGroup} controlId="phone_number">
                            <Form.Label className={styles.customerLabel}>Tên</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className={styles.customerGroup} controlId="address">
                            <Form.Label className={styles.customerLabel}>Địa chỉ</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className={styles.customerGroup} controlId="phone_number">
                            <Form.Label className={styles.customerLabel}>Số điện thoại</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
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

export default EditCustomerModal;
