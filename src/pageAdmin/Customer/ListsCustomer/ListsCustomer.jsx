import React, { useEffect, useState } from 'react';
import styles from './ListsCustomer.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import { toast } from 'react-toastify';

import { getUserApi } from '@/utils/api';
import TableCustomer from './TableCustomer/TableCustomer';
import CommonButton from '@/components/UI/CommonButton/CommonButton ';
import { useNavigate } from 'react-router-dom';
import icons from '@/utils/icon';
import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
const ListsCustomer = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { FaPlusCircle } = icons;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserApi();
                // console.log('dataTable', response);
                setUserData(response);
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error('Token đã hết hạn, vui lòng đăng nhập lại.');
                } else {
                    toast.error('Đã xảy ra lỗi khi lấy dữ liệu người dùng.');
                }

                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddCustomer = () => {
        navigate('/addCustomer');
    };

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Spinner animation="border" variant="primary" size="lg" role="status" aria-hidden="true" />
            </div>
        );
    }

    return (
        <div>
            <div className={styles.listsCustomer}>
                <Breadcrumb items={['Quản lý khách hàng', 'Danh sách khách hàng']} activeItem="Danh sách khách hàng" />
            </div>
            <div>
                <div className={styles.listsCustomerButton}>
                    <div className={styles.formSearch}>
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm thông tin khách hàng"
                            className={styles.formSearchInput}
                        />
                        <button className={styles.formSearchBtn}>Tìm kiếm</button>
                    </div>

                    <CommonButton onClick={handleAddCustomer} icon={FaPlusCircle} label="Thêm" />
                </div>
                <TableCustomer data={userData} itemsPerPage={5} />
            </div>
          
        </div>
    );
};

export default ListsCustomer;
