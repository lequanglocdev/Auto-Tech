import React, { useState } from 'react';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './CreatePrice.module.css';
import { Form } from 'react-bootstrap';
import { createPriceApi } from '@/utils/api';
import icons from '@/utils/icon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const CreatePrice = () => {
    const navigate = useNavigate();

    const [priceName, setPriceName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({ priceName: '', startDate: '', endDate: '' });
    const { FaPlusCircle, MdArrowBackIos } = icons;

    const validateForm = () => {
        const newErrors = { priceName: '', startDate: '', endDate: '' };
        let isValid = true;
    
        const today = new Date().toISOString().split('T')[0]; // Lấy ngày hôm nay dưới dạng yyyy-mm-dd
    
        if (!priceName) {
            newErrors.priceName = 'Tên giá không được để trống!';
            isValid = false;
        }
    
        if (!startDate) {
            newErrors.startDate = 'Ngày bắt đầu không được để trống!';
            isValid = false;
        } else if (startDate < today) {
            newErrors.startDate = 'Ngày bắt đầu phải lớn hơn hoặc bằng ngày hôm nay!';
            isValid = false;
        }
    
        if (!endDate) {
            newErrors.endDate = 'Ngày kết thúc không được để trống!';
            isValid = false;
        } else if (endDate <= startDate) {
            newErrors.endDate = 'Ngày kết thúc phải lớn hơn ngày bắt đầu!';
            isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        try {
            const response = await createPriceApi(priceName, startDate, endDate);
            // console.log('>>> API Response:', response);
            toast.success('Bảng giá đã được thêm thành công!');
            setPriceName('');
            setStartDate('');
            setEndDate('');
        } catch (error) {
            toast.error('Lỗi nhập dữ liệu');
        }
    };

    const handleListCustomer = () => {
        navigate('/prices');
    };

    return (
        <div>
            <div className={styles.createPrice}>
                <MdArrowBackIos onClick={handleListCustomer} className={styles.createPriceIcon} />
                <Breadcrumb items={['Quản lý bảng giá', 'Thêm mới bảng giá']} activeItem="Thêm mới bảng giá" />
            </div>
            <div className={styles.createPriceBody}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label className={styles.labelText}>Tên bảng giá</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên bảng giá"
                            size="lg"
                            value={priceName}
                            onChange={(e) => setPriceName(e.target.value)}
                            isInvalid={!!errors.priceName}
                        />
                        <Form.Control.Feedback type="invalid">{errors.priceName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupStartDate">
                        <Form.Label className={styles.labelText}>Ngày bắt đầu</Form.Label>
                        <Form.Control
                            type="date"
                            size="lg"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            isInvalid={!!errors.startDate}
                        />
                        <Form.Control.Feedback type="invalid">{errors.startDate}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupEndDate">
                        <Form.Label className={styles.labelText}>Ngày kết thúc</Form.Label>
                        <Form.Control
                            type="date"
                            size="lg"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            isInvalid={!!errors.endDate}
                        />
                         <Form.Control.Feedback type="invalid">{errors.endDate}</Form.Control.Feedback>
                    </Form.Group>

                    <button type="submit" className={styles.btnAdd}>
                        <FaPlusCircle />
                        Thêm
                    </button>
                </Form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default CreatePrice;
