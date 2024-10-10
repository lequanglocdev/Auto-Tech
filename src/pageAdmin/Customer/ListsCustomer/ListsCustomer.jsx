import React, { useEffect, useState } from 'react';
import styles from './ListsCustomer.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserApi } from '@/utils/api';
import TableCustomer from './TableCustomer/TableCustomer';
const ListsCustomer = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserApi();
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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className={styles.listsCustomer}>
                <Breadcrumb items={['Quản lý khách hàng', 'danh sách khách hàng']} activeItem="danh sách khách hàng" />
            </div>
            <div>
                <TableCustomer data={userData} itemsPerPage={5} />
            </div>
            <ToastContainer />
        </div>
    );
};

export default ListsCustomer;
