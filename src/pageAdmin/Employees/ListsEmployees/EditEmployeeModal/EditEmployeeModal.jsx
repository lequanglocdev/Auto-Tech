import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const EditEmployeeModal = ({ user, show, onHide, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        role: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone_number: user.phone_number || '',
                role: user.role || ''
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
                <Modal.Title>Chỉnh sửa thông tin nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Tên</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="phone_number">
                            <Form.Label>Điện thoại</Form.Label>
                            <Form.Control type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="role">
                            <Form.Label>Vai trò</Form.Label>
                            <Form.Control type="text" name="role" value={formData.role} onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-2">Cập nhật</Button>
                    </Form>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditEmployeeModal;
