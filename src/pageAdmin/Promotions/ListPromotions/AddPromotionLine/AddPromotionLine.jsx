

import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import styles from './AddPromotionLine.module.css'
import icons from '@/utils/icon';
const AddPromotionLine = ({ show, promotionHeader, onHide, onSubmit }) => {
  const { FaPlusCircle } = icons;
  const [formData, setFormData] = useState({
        discount_type: 1,
        description: '',
        start_date: '',
        end_date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Gọi hàm onSubmit truyền từ props
        setFormData({
            discount_type: '',
            description: '',
            start_date: '',
            end_date: '',
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm dòng khuyến mãi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className={styles.promotionForm}>
                    <Form.Group className="mb-3" controlId="discountType">
                        <Form.Label className={styles.labelText}>Loại giảm giá</Form.Label>
                        <Form.Control
                            as="select"
                            name="discount_type"
                            value={formData.discount_type}
                            onChange={handleChange}
                            placeholder="Nhập mô tả"
                            size="lg"
                        >
                            <option value={1}>Giảm giá theo phần trăm</option>
                            <option value={2}>Giảm giá cố định</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label className={styles.labelText}>Mô tả</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Nhập mô tả"
                            size="lg"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="startDate">
                        <Form.Label className={styles.labelText}>Ngày bắt đầu</Form.Label>
                        <Form.Control
                            type="date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            required
                            placeholder="Nhập mô tả"
                            size="lg"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="endDate">
                        <Form.Label className={styles.labelText}>Ngày kết thúc</Form.Label>
                        <Form.Control
                            type="date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            required
                            placeholder="Nhập mô tả"
                            size="lg"
                        />
                    </Form.Group>
                    <button type="submit" className={styles.btnAdd}>
                        <FaPlusCircle />
                        Thêm
                    </button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddPromotionLine
