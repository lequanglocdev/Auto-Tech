import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from './EditRankModal.module.css';
const EditRankModal = ({ rank, show, onHide, onUpdate }) => {
    const [formData, setFormData] = useState({
        rank_name: '',
        discount_rate: '',
        min_spending: '',
        description: '',
    });

    useEffect(() => {
        if (rank) {
            setFormData({
                rank_name: rank.rank_name || '',
                discount_rate: rank.discount_rate || '',
                min_spending: rank.min_spending || '',
                description: rank.description || '',
            });
        }
    }, [rank]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...rank, ...formData });
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className={styles.customerTitle}>Chỉnh sửa hạng khách hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {rank ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className={styles.customerGroup} controlId="rank_name">
                            <Form.Label className={styles.customerLabel}>Thứ hạng</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="text"
                                name="rank_name"
                                value={formData.rank_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className={styles.customerGroup} controlId="discount_rate">
                            <Form.Label className={styles.customerLabel}>Giảm giá</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="text"
                                name="discount_rate"
                                value={formData.discount_rate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className={styles.customerGroup} controlId="min_spending">
                            <Form.Label className={styles.customerLabel}>Phí tối thiểu</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="text"
                                name="min_spending"
                                value={formData.min_spending}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className={styles.customerGroup} controlId="role">
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
                    <p>Loading....</p>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default EditRankModal;
