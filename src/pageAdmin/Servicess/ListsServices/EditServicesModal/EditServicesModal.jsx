import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const EditServicesModal = ({ user, show, onHide, onUpdate }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Group controlId="name">
                        <Form.Label>Loại dịch vụ</Form.Label>
                        <Form.Control type="text" name="name"/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Tên dịch vụ</Form.Label>
                        <Form.Control type="email" name="email" />
                    </Form.Group>
                    <Form.Group controlId="phone_number">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-2">
                        Cập nhật
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditServicesModal;
