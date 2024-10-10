import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import React from 'react';
import styles from './CreateServices.module.css'
import { Form } from 'react-bootstrap';
import icons from '@/utils/icon';
import useCreateServices from './hooks/useCreateServices';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                    <Form.Group className="mb-3" controlId="serviceCode">
                        <Form.Label className={styles.labelText}>Loại dịch vụ</Form.Label>
                        <Form.Control
                            type="text"
                            name="serviceCode"
                            placeholder="Nhập loại dịch vụ"
                            size="lg"
                            value={formData.serviceCode}
                            onChange={handleChange}
                            isInvalid={!!errors.serviceCode}
                        />
                        <Form.Control.Feedback type="invalid">{errors.serviceCode}</Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>

                    <button type="submit" className={styles.btnAdd}>
                        <FaPlusCircle />
                        Thêm
                    </button>
                </Form>
                <ToastContainer/>
            </div>
        </div>
    );
};

export default CreateServices;
