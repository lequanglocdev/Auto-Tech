import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './ListsCar.module.css'
import { getCarApi } from '@/utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableCar from './Table/TableCar';
const ListsCar = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCarApi();
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
                <Breadcrumb items={['Quản lý khách hàng', 'Danh sách xe']} activeItem="Danh sách xe" />
            </div>
            <div>
                <TableCar data={userData} itemsPerPage={5} />
            </div>
            <ToastContainer />
        </div>
    );
};

export default ListsCar;
