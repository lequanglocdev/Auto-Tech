import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './ListsCar.module.css';
import { getCarApi } from '@/utils/api';
import { toast } from 'react-toastify';

import TableCar from './Table/TableCar';
import { useNavigate } from 'react-router-dom';
import icons from '@/utils/icon';
import CommonButton from '@/components/UI/CommonButton/CommonButton ';
import { Spinner } from 'react-bootstrap';
const ListsCar = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { FaPlusCircle } = icons;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCarApi();
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

    const handleAddCar = () => {
        navigate('/addCar');
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
            <div className={styles.listCar}>
                <Breadcrumb items={['Quản lý loại xe', 'Danh sách loại xe']} activeItem="Danh sách loại xe" />
            </div>
            <div>
                <div className={styles.listsCarButton}>
                    <CommonButton onClick={handleAddCar} icon={FaPlusCircle} label="Thêm" />
                </div>
                <TableCar data={userData} itemsPerPage={5} />
            </div>
    
        </div>
    );
};

export default ListsCar;
