import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditPromotionLine = ({ promotion, show, onHide, onUpdate }) => {
    const [formData, setFormData] = useState({
        discount_type: promotion?.discount_type || 'percentage',
        description: promotion?.description || '',
        start_date: promotion?.start_date ? new Date(promotion.start_date).toISOString().split('T')[0] : '', // Chuyển đổi sang YYYY-MM-DD
        end_date: promotion?.end_date ? new Date(promotion.end_date).toISOString().split('T')[0] : '' // Chuyển đổi sang YYYY-MM-DD
    });

    useEffect(() => {
        if (promotion) {
            setFormData({
                discount_type: promotion.discount_type,
                description: promotion.description,
                start_date: promotion.start_date ? new Date(promotion.start_date).toISOString().split('T')[0] : '',
                end_date: promotion.end_date ? new Date(promotion.end_date).toISOString().split('T')[0] : ''
            });
        }
    }, [promotion]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedLine = {
            ...promotion,
            ...formData,
            start_date: new Date(formData.start_date).toISOString(),
            end_date: new Date(formData.end_date).toISOString()
        };
        onUpdate(updatedLine);
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin khuyến mãi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="discountType">
                        <Form.Label>Loại giảm giá</Form.Label>
                        <Form.Control
                            as="select"
                            name="discount_type"
                            value={formData.discount_type}
                            onChange={handleChange}
                        >
                            <option value="1">Phần trăm</option>
                            <option value="2">Giá trị cố định</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="startDate">
                        <Form.Label>Ngày bắt đầu</Form.Label>
                        <Form.Control
                            type="date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="endDate">
                        <Form.Label>Ngày kết thúc</Form.Label>
                        <Form.Control
                            type="date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Cập nhật
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditPromotionLine;
