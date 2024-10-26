import React, { useState } from 'react';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './CreateCar.module.css';
import { Form } from 'react-bootstrap';
import { createCarApi } from '@/utils/api';
import icons from '@/utils/icon';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

const CreateCar = () => {
    const [vehicleTypeName, setVehicleTypeName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({ vehicleTypeName: '', description: '' });
    const { FaPlusCircle, MdArrowBackIos } = icons;
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = { vehicleTypeName: '', description: '' };
        let isValid = true;

        if (!vehicleTypeName) {
            newErrors.vehicleTypeName = 'Tên xe không được để trống!';
            isValid = false;
        }

        if (!description) {
            newErrors.description = 'Mô tả không được để trống!';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return; 

        try {
            const response = await createCarApi(vehicleTypeName, description);
            console.log('>>> API Response:', response);
            toast.success('Xe đã được thêm thành công!');
            setVehicleTypeName('');
            setDescription('');
            setErrors({ vehicleTypeName: '', description: '' }); // Reset lỗi
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMsg = error.response.data.msg;
                if (errorMsg === "Loại xe này đã tồn tại") {
                    toast.error('Loại xe này đã tồn tại!');
                } else {
                    toast.error(errorMsg);
                }
            } else {
                toast.error('Có lỗi xảy ra khi thêm xe!');
            }
        }
    };

    const handleListCar = () => {
        navigate('/car');
    };

    return (
        <div>
            <div className={styles.createCar}>
                <MdArrowBackIos onClick={handleListCar} className={styles.createCarIcon} />
                <Breadcrumb items={['Quản lý loại xe', 'Thêm loại xe']} activeItem="Thêm loại xe" />
            </div>
            <div className={styles.createCarBody}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label className={styles.labelText}>Loại xe</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập hãng xe"
                            size="lg"
                            value={vehicleTypeName}
                            onChange={(e) => setVehicleTypeName(e.target.value)}
                            isInvalid={!!errors.vehicleTypeName} 
                        />
                        <Form.Control.Feedback type="invalid">{errors.vehicleTypeName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupDes">
                        <Form.Label className={styles.labelText}>Mô tả</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập mô tả"
                            size="lg"
                            value={description}
                            as="textarea"
                            rows={3}
                            onChange={(e) => setDescription(e.target.value)}
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

export default CreateCar;
