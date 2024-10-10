import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const EditServicesModal = ({ service, show, onHide, onUpdate }) => {
    const [formData, setFormData] = useState({
        service_code: '',
        name: '',
        description: ''
    });
    useEffect(() => {
        if (service) {
            setFormData({
                service_code: service.service_code || '',
                name: service.name || '',
                description: service.description || ''
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
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {service ? (
                 <Form onSubmit={handleSubmit}>
                 <Form.Group controlId="name">
                     <Form.Label>Loại dịch vụ</Form.Label>
                     <Form.Control type="text" name="service_code"value={formData.service_code} onChange={handleChange} />
                 </Form.Group>
                 <Form.Group controlId="name">
                     <Form.Label>Tên dịch vụ</Form.Label>
                     <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                 </Form.Group>
                 <Form.Group controlId="description">
                     <Form.Label>Mô tả</Form.Label>
                     <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
                 </Form.Group>
                 <Button variant="primary" type="submit" className="mt-2">
                     Cập nhật
                 </Button>
             </Form>
               ): (
                    <p>Loading...</p>
               )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditServicesModal;
