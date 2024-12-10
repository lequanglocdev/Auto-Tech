import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from './EditPriceModal.module.css';
import { toast } from 'react-toastify'; // Để hiển thị thông báo lỗi

const EditPriceModal = ({ priceId, show, onHide, onUpdate }) => {
    const [formData, setFormData] = useState({
        price_list_name: '',
        start_date: '',
        end_date: '',
    });

    useEffect(() => {
        if (priceId) {
            setFormData({
                price_list_name: priceId.price_list_name || '',
                start_date: priceId.start_date ? new Date(priceId.start_date).toISOString().slice(0, 10) : '',
                end_date: priceId.end_date ? new Date(priceId.end_date).toISOString().slice(0, 10) : '',
            });
        }
    }, [priceId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Lấy ngày hiện tại và chuyển đổi sang dạng yyyy-mm-dd
        const today = new Date().toISOString().slice(0, 10);
        const { start_date, end_date } = formData;

        // Kiểm tra điều kiện start_date phải lớn hơn hoặc bằng ngày hôm nay
        if (start_date < today) {
            toast.error('Ngày bắt đầu phải lớn hơn hoặc bằng ngày hôm nay!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        // Kiểm tra điều kiện end_date phải lớn hơn start_date
        if (end_date <= start_date) {
            toast.error('Ngày kết thúc phải lớn hơn ngày bắt đầu!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        // Nếu cả hai điều kiện đều hợp lệ, gọi onUpdate
        onUpdate({ ...priceId, ...formData });
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className={styles.customerTitle}>Cập nhật bảng giá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {priceId ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className={styles.customerGroup} controlId="price_list_name">
                            <Form.Label className={styles.customerLabel}>Tên bảng giá</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="text"
                                name="price_list_name"
                                value={formData.price_list_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className={styles.customerGroup} controlId="start_date">
                            <Form.Label className={styles.customerLabel}>Ngày bắt đầu</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className={styles.customerGroup} controlId="end_date">
                            <Form.Label className={styles.customerLabel}>Ngày kết thúc</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="date"
                                name="end_date"
                                value={formData.end_date}
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

export default EditPriceModal;
