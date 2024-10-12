import React, { useState } from 'react';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './CreateCar.module.css';
import { Form } from 'react-bootstrap';
import { createCarApi } from '@/utils/api';
import icons from '@/utils/icon';
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const CreateCar = () => {
    const [vehicleTypeName, setVehicleTypeName] = useState('');
    const [description, setDescription] = useState('');
    const { FaPlusCircle, MdArrowBackIos } = icons;
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await createCarApi(vehicleTypeName, description);
            console.log('>>> API Response:', response);
            toast.success('Xe đã được thêm thành công!');
            setVehicleTypeName('');
            setDescription('');
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
        navigate('/customer');
    };

    return (
        <div>
            <div className={styles.createCar}>
            <MdArrowBackIos onClick={handleListCar} className={styles.createCarIcon} />
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
                            as="textarea"
                            rows={3}
                            onChange={(e) => setDescription(e.target.value)}
                        />
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

export default CreateCar;
