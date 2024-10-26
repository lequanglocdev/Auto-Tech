import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import React from 'react';
import styles from './CreateSlot.module.css';
import { Form } from 'react-bootstrap';
import icons from '@/utils/icon';
import useCreateSlot from './hooks/useCreateSlot';

import { useNavigate } from 'react-router-dom';

const CreateSlot = () => {
    const navigate = useNavigate();
    const { FaPlusCircle, MdArrowBackIos } = icons;
    const { formData, errors, handleChange, handleSubmit } = useCreateSlot();

    const handleListServices = () => {
        navigate('/admin');
    };

    return (
        <div>
            <div className={styles.createServices}>
                <MdArrowBackIos onClick={handleListServices} className={styles.createServiceIcon} />
                <Breadcrumb items={['Khu vực chăm sóc khách hàng', 'Thêm vị trí mới']} activeItem="Thêm vị trí mới" />
            </div>
            <div className={styles.createServicesBody}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="slotDatetime">
                        <Form.Label className={styles.labelText}>Thời gian và ngày</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="slotDatetime"
                            placeholder="Nhập thời gian và ngày"
                            size="lg"
                            value={formData.slotDatetime}
                            onChange={handleChange}
                            isInvalid={!!errors.slotDatetime}
                        />
                        <Form.Control.Feedback type="invalid">{errors.slotDatetime}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="durationMinutes">
                        <Form.Label className={styles.labelText}>Thời lượng (phút)</Form.Label>
                        <Form.Control
                            type="number"
                            name="durationMinutes"
                            placeholder="Nhập thời lượng"
                            size="lg"
                            value={formData.durationMinutes}
                            onChange={handleChange}
                            isInvalid={!!errors.durationMinutes}
                        />
                        <Form.Control.Feedback type="invalid">{errors.durationMinutes}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="status">
                        <Form.Label className={styles.labelText}>Trạng thái</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            size="lg"
                            isInvalid={!!errors.status}
                        >
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="capacity">
                        <Form.Label className={styles.labelText}>Số lượng</Form.Label>
                        <Form.Control
                            type="number"
                            name="capacity"
                            placeholder="Nhập số lượng"
                            size="lg"
                            value={formData.capacity}
                            onChange={handleChange}
                            isInvalid={!!errors.capacity}
                        />
                        <Form.Control.Feedback type="invalid">{errors.capacity}</Form.Control.Feedback>
                    </Form.Group>

                    <button type="submit" className={styles.btnAdd}>
                        <FaPlusCircle /> Thêm
                    </button>
                </Form>
            
            </div>
        </div>
    );
};

export default CreateSlot;
