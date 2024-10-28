import React, { useEffect, useState } from 'react';
import styles from './ListsCustomer.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import { toast } from 'react-toastify';

import { findCustomerApi, getUserApi } from '@/utils/api';
import TableCustomer from './TableCustomer/TableCustomer';
import CommonButton from '@/components/UI/CommonButton/CommonButton ';
import { useNavigate } from 'react-router-dom';
import icons from '@/utils/icon';
import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
const ListsCustomer = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState(''); 
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

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            // Nếu không có gì để tìm kiếm, quay lại danh sách đầy đủ
            const response = await getUserApi();
            setUserData(response);
            return;
        }

        setLoading(true);
        try {
            const response = await findCustomerApi(`phone=${searchQuery}`);
            if (response && response.length > 0) {
                setUserData(response.data); // Cập nhật danh sách với kết quả tìm kiếm
            } else {
                toast.info('Không tìm thấy khách hàng với số điện thoại này.');
                setUserData([]); // Xóa danh sách nếu không tìm thấy
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi tìm kiếm.');
        } finally {
            setLoading(false);
        }
    };
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className={styles.formSearchBtn} onClick={handleSearch}>Tìm kiếm</button>
                    </div>

                    <CommonButton onClick={handleAddCustomer} icon={FaPlusCircle} label="Thêm" />
                </div>
                <TableCustomer data={userData} itemsPerPage={5} />
            </div>
          
        </div>
    );
};

export default ListsCustomer;
