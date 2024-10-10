import React, { useState } from 'react';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './CreatePrice.module.css';
import { Form } from 'react-bootstrap';
import {createPriceApi } from '@/utils/api';
import icons from '@/utils/icon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePrice = () => {
    const [priceName, setPriceName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { FaPlusCircle } = icons;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await createPriceApi(priceName, startDate, endDate);
            console.log('>>> API Response:', response);
            toast.success('Bảng giá đã được thêm thành công!');
            setPriceName('');
            setStartDate('');
            setEndDate('');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMsg = error.response.data.msg;
                toast.error(errorMsg);
            } else {
                toast.error('Có lỗi xảy ra khi thêm bảng giá!');
            }
        }
    };

    return (
        <div>
            <div className={styles.createPrice}>
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
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupStartDate">
                        <Form.Label className={styles.labelText}>Ngày bắt đầu</Form.Label>
                        <Form.Control
                            type="date"
                            size="lg"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupEndDate">
                        <Form.Label className={styles.labelText}>Ngày kết thúc</Form.Label>
                        <Form.Control
                            type="date"
                            size="lg"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
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
