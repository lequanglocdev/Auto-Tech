import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

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
                <Modal.Title>Chỉnh sửa hạng khách hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {rank ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="rank_name">
                            <Form.Label>Thứ hạng</Form.Label>
                            <Form.Control
                                type="text"
                                name="rank_name"
                                value={formData.rank_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="discount_rate">
                            <Form.Label>Giảm giá</Form.Label>
                            <Form.Control
                                type="text"
                                name="discount_rate"
                                value={formData.discount_rate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="min_spending">
                            <Form.Label>Phí tối thiểu</Form.Label>
                            <Form.Control
                                type="text"
                                name="min_spending"
                                value={formData.min_spending}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="role">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control as="textarea" rows={3}  name="description" value={formData.description} onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-2">
                            Cập nhật
                        </Button>
                    </Form>
                ) : (
                    <p>Loading....</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditRankModal;
