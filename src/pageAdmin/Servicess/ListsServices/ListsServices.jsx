import React, { useEffect, useState } from 'react';
import styles from './ListsServices.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import {toast } from 'react-toastify';
import { getServicesApi } from '@/utils/api';
import TableServices from './Table/TableServices';
import icons from '@/utils/icon';
import CommonButton from '@/components/UI/CommonButton/CommonButton ';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
const ListsServices = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { FaPlusCircle } = icons;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getServicesApi();
                console.log('dataTable', response);
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

    const handleAddServices = () => {
        navigate('/addService');
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
                <Breadcrumb items={['Quản lý khách hàng', 'danh sách khách hàng']} activeItem="danh sách khách hàng" />
            </div>
            <div>
                <div className={styles.listsServicesButton}>
                    <CommonButton onClick={handleAddServices} icon={FaPlusCircle} label="Thêm" />
                </div>
                <TableServices data={userData} itemsPerPage={5} />
            </div>
         
        </div>
    );
};

export default ListsServices;
