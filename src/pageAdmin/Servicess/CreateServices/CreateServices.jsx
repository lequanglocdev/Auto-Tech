import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import React from 'react';
import styles from './CreateServices.module.css'
import { Form } from 'react-bootstrap';
import icons from '@/utils/icon';
import useCreateServices from './hooks/useCreateServices';

const CreateServices = () => {
  const { FaPlusCircle } = icons;
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
} = useCreateServices();
  return (
        <div>
            <div className={styles.createServices}>
                <Breadcrumb items={['Quản lý dịch vụ', 'Thêm mới']} activeItem="Thêm mới" />
            </div>
            <div className={styles.createServicesBody}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="employeeCode">
                        <Form.Label className={styles.labelText}>Loại dịch vụ</Form.Label>
                        <Form.Control
                            type="text"
                            name="serviceCode"
                            placeholder="Nhập mã nhân viên"
                            size="lg"
                            value={formData.serviceCode}
                            onChange={handleChange}
                            isInvalid={!!errors.serviceCode}
                        />
                        <Form.Control.Feedback type="invalid">{errors.serviceCode}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="employeeName">
                        <Form.Label className={styles.labelText}>Tên dịch vụ</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập tên nhân viên"
                            size="lg"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label className={styles.labelText}>Mô tả</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Nhập mật khẩu"
                            size="lg"
                            value={formData.description}
                            onChange={handleChange}
                            isInvalid={!!errors.description}
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

export default CreateServices;
