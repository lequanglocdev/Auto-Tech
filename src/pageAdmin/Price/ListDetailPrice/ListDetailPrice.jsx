import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './ListDetailPrice.module.css'
import { getPriceApi } from '@/utils/api';
import {  toast } from 'react-toastify';
import TablePrice from './Table/TableDetailPrice';
const ListDetailPrice = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPriceApi();
                console.log('dataTableCar', response);
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

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <div className={styles.listCar}>
                <Breadcrumb items={['Quản lý bảng giá', 'danh sách bảng giá']} activeItem="danh sách bảng giá" />
            </div>
            <div>
                <TablePrice data={userData} itemsPerPage={5} />
            </div>
        </div>
    );
};

export default ListDetailPrice;
