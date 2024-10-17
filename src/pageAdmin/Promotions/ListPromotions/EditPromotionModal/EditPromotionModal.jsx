import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from './EditPromotionModal.module.css';
const EditCustomerModal = ({ user, show, onHide, onUpdate }) => {
    const [formData, setFormData] = useState({
        promotion_code: '',
        name: '',
        description: '',
      
    });
    useEffect(() => {
        if (user) {
            setFormData({
                promotion_code: user.promotion_code || '',
                name: user.name || '',
                description: user.description || '',
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
                <Modal.Title className={styles.customerTitle}>Chỉnh sửa thông tin khuyến mãi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className={styles.customerGroup} controlId="promotion_code">
                            <Form.Label className={styles.customerLabel}>Mã chương trình khuyến mãi</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="text"
                                name="promotion_code"
                                value={formData.promotion_code}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className={styles.customerGroup} controlId="name">
                            <Form.Label className={styles.customerLabel}>Tên chương trình khuyến mãi</Form.Label>
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

export default EditCustomerModal;
