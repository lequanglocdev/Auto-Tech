import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './ListsCar.module.css';
import { getCarApi } from '@/utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableCar from './Table/TableCar';
import { useNavigate } from 'react-router-dom';
import icons from '@/utils/icon';
import CommonButton from '@/components/UI/CommonButton/CommonButton ';
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
        return <p>Loading...</p>;
    }
    return (
        <div>
            <div className={styles.listCar}>
                <Breadcrumb items={['Quản lý xe', 'Danh sách xe']} activeItem="Danh sách xe" />
            </div>
            <div>
                <div className={styles.listsCarButton}>
                    <CommonButton onClick={handleAddCar} icon={FaPlusCircle} label="Thêm" />
                </div>
                <TableCar data={userData} itemsPerPage={5} />
            </div>
            <ToastContainer />
        </div>
    );
};

export default ListsCar;
