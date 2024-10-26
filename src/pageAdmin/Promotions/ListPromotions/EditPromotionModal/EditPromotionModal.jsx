import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from './EditPromotionModal.module.css';
const EditCustomerModal = ({ user, show, onHide, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        is_active:''
    });
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                description: user.description || '',
                is_active: user.is_active ? 'active' : 'inactive', // Chuyển đổi thành chuỗi để hiển thị trong form
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            _id: user._id, // Sử dụng ID hiện tại
            name: formData.name || user.name,
            description: formData.description || user.description,
            is_active: formData.is_active === 'active', // Chuyển đổi trạng thái
        };
        onUpdate(updatedData); // Gửi dữ liệu cập nhật lên component cha
    };
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className={styles.customerTitle}>Chỉnh sửa thông tin khuyến mãi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user ? (
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className={styles.customerGroup} controlId="name">
                            <Form.Label className={styles.customerLabel}>Tên chương trình</Form.Label>
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

                        <Form.Group className={styles.customerGroup} controlId="is_active">
                            <Form.Label className={styles.customerLabel}>Trạng thái</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                as="select" // Thay đổi từ type="text" thành as="select"
                                name="is_active"
                                value={formData.is_active} // Chọn giá trị dựa trên trạng thái
                                onChange={handleChange}
                            >
                                <option value="active">Hoạt động</option>
                                <option value="inactive">Ngưng hoạt động</option>
                            </Form.Control>
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
