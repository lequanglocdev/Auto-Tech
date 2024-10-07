import React, { useState } from 'react';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './CreateCar.module.css';
import { Alert, Button, Form } from 'react-bootstrap';
import { createCarApi } from '@/utils/api';

const CreateCar = () => {
    const [vehicleTypeName, setVehicleTypeName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);

        try {
            // Gọi API tạo xe
            const response = await createCarApi(vehicleTypeName, description);
            console.log(">>> API Response:", response);

            // Hiển thị thông báo thành công
            setSuccess(true);

            // Reset form sau khi thành công
            setVehicleTypeName('');
            setDescription('');
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            setError('Tạo xe thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div>
            <div className={styles.createCar}>
                <Breadcrumb items={['Quản lý xe', 'Thêm mới xe']} activeItem="Thêm mới xe" />
            </div>
            <div className={styles.createCarBody}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label className={styles.labelText}>Tên xe</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên xe"
                            size="lg"
                            value={vehicleTypeName}
                            onChange={(e) => setVehicleTypeName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupDes">
                        <Form.Label className={styles.labelText}>Mô tả</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập mô tả"
                            size="lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Button type="submit" variant="primary">Thêm</Button>

                    {/* Hiển thị thông báo lỗi */}
                    {error && (
                        <Alert variant="danger" className="mt-3">
                            {error}
                        </Alert>
                    )}

                    {/* Hiển thị thông báo thành công */}
                    {success && (
                        <Alert variant="success" className="mt-3">
                            Tạo xe thành công!
                        </Alert>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default CreateCar;
