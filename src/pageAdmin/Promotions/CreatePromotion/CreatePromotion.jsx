import React from 'react';
import styles from './CreatePromotion.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import icons from '@/utils/icon';
import { Button, Form, Modal } from 'react-bootstrap';
import useCreatePromotionForm from './hooks/useCreatePromotionForm';

import { useNavigate } from 'react-router-dom';

const CreatePromotion = () => {
    const navigate = useNavigate();
    const { FaPlusCircle, MdArrowBackIos } = icons;

    const { formData, errors, ranks, handleChange, handleSubmit } = useCreatePromotionForm();

    const handleListCustomer = () => {
        navigate('/promotion');
    };

    return (
        <div>
            <div className={styles.createPromotion}>
                <MdArrowBackIos onClick={handleListCustomer} className={styles.createPromotionIcon} />
                <Breadcrumb
                    items={['Quản lý chương trình khuyến mãi', 'Thêm mới chương trình khuyến mãi']}
                    activeItem="Thêm mới chương trình khuyến mãi"
                />
            </div>
            <div className={styles.createPromotionBody}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="promotionCode">
                        <Form.Label className={styles.labelText}>Mã khuyến mãi</Form.Label>
                        <Form.Control
                            type="text"
                            name="promotionCode"
                            placeholder="Nhập mã khuyến mãi"
                            size="lg"
                            value={formData.promotionCode}
                            onChange={handleChange}
                            isInvalid={!!errors.promotionCode}
                        />
                        <Form.Control.Feedback type="invalid">{errors.promotionCode}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label className={styles.labelText}>Tên chương trình khuyến mãi</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập tên chương trình khuyến mãi"
                            size="lg"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="startDate">
                        <Form.Label className={styles.labelText}>Ngày bắt đầu</Form.Label>
                        <Form.Control
                            type="date"
                            name='startDate'
                            size="lg"
                            value={formData.startDate}
                            onChange={handleChange}
                            isInvalid={!!errors.startDate}
                        />
                        <Form.Control.Feedback type="invalid">{errors.startDate}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="endDate">
                        <Form.Label className={styles.labelText}>Ngày kết thúc</Form.Label>
                        <Form.Control
                            type="date"
                            size="lg"
                            name='endDate'
                            value={formData.endDate}
                            onChange={handleChange}
                            isInvalid={!!errors.endDate}
                        />
                         <Form.Control.Feedback type="invalid">{errors.endDate}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label className={styles.labelText}>Mô tả</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            placeholder="Nhập mô tả"
                            size="lg"
                            value={formData.description}
                            onChange={handleChange}
                            isInvalid={!!errors.description}
                            rows={3}
                        />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>

                   

                   
                    <button type="submit" className={styles.btnAdd}>
                        <FaPlusCircle />
                        Thêm
                    </button>
                </Form>
            </div>

         
        </div>
    );
};

export default CreatePromotion;
