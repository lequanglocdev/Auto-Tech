import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import React from 'react';
import styles from './CreateServices.module.css'
import { Form } from 'react-bootstrap';
import icons from '@/utils/icon';
import useCreateServices from './hooks/useCreateServices';

import { useNavigate } from 'react-router-dom';
const CreateServices = () => {
    const navigate = useNavigate();
  const { FaPlusCircle,MdArrowBackIos } = icons;
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
} = useCreateServices();

const handleListServices = () => {
    navigate('/service');
};

  return (
        <div>
            <div className={styles.createServices}>
            <MdArrowBackIos onClick={handleListServices} className={styles.createServiceIcon} />
                <Breadcrumb items={['Quản lý dịch vụ', 'Thêm mới']} activeItem="Thêm mới" />
            </div>
            <div className={styles.createServicesBody}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="serviceCode">
                        <Form.Label className={styles.labelText}>Mã dịch vụ</Form.Label>
                        <Form.Control
                            type="text"
                            name="serviceCode"
                            placeholder="Nhập loại dịch vụ"
                            size="lg"
                            value={formData.serviceCode}
                            onChange={handleChange}
                            isInvalid={!!errors.serviceCode}
                        />
                        <Form.Control.Feedback className={styles.errorFeeback} type="invalid">{errors.serviceCode}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label className={styles.labelText}>Tên dịch vụ</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập tên dịch vụ"
                            size="lg"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback className={styles.errorFeeback} type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label className={styles.labelText}>Mô tả</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Nhập mô tả"
                            size="lg"
                            value={formData.description}
                            onChange={handleChange}
                            isInvalid={!!errors.description}
                            as="textarea" rows={3}
                        />
                        <Form.Control.Feedback className={styles.errorFeeback} type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="timeRequired">
                        <Form.Label className={styles.labelText}>Thời gian hoàn thành</Form.Label>
                        <Form.Control
                            type="text"
                            name="timeRequired"
                            placeholder="Nhập thời gian hoàn thành"
                            size="lg"
                            value={formData.timeRequired}
                            onChange={handleChange}
                            isInvalid={!!errors.timeRequired}
                        />
                        <Form.Control.Feedback className={styles.errorFeeback} type="invalid">{errors.timeRequired}</Form.Control.Feedback>
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

export default CreateServices;
