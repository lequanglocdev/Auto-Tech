import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditPromotionLine = ({ promotionLine, show, onHide, onUpdate }) => {
    const [formData, setFormData] = useState({
        discount_type: promotionLine?.discount_type || '1',
        description: promotionLine?.description || '',
        start_date: promotionLine?.start_date ? new Date(promotionLine.start_date).toISOString().split('T')[0] : '', 
        end_date: promotionLine?.end_date ? new Date(promotionLine.end_date).toISOString().split('T')[0] : '' ,
        active: promotionLine?.active ? 'active' : 'inactive' 
    });

    useEffect(() => {
        if (promotionLine) {
            setFormData({
                discount_type: promotionLine.discount_type.toString(),
                description: promotionLine.description,
                start_date: promotionLine.start_date ? new Date(promotionLine.start_date).toISOString().split('T')[0] : '',
                end_date: promotionLine.end_date ? new Date(promotionLine.end_date).toISOString().split('T')[0] : '',
                active: promotionLine.active ? 'active' : 'inactive'
            });
        }
    }, [promotionLine]);

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
            ...promotionLine,
            ...formData,
            start_date: new Date(formData.start_date).toISOString(),
            end_date: new Date(formData.end_date).toISOString(),
            discount_type: parseInt(formData.discount_type),
            active: formData.active === 'active' 
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
                            <option value="1">Giá trị theo phần trăm</option>
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
                    <Form.Group controlId="active">
                        <Form.Label>Trạng thái</Form.Label>
                        <Form.Control
                            as="select"
                            name="active"
                            value={formData.active}
                            onChange={handleChange}
                        >
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Ngưng hoạt động</option>
                        </Form.Control>
                    </Form.Group>
                    <Button className="mt-4" variant="primary" type="submit">
                        Cập nhật
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditPromotionLine;
