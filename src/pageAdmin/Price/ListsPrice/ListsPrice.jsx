import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './ListsPrice.module.css';
import { getPriceApi } from '@/utils/api';
import { toast } from 'react-toastify';

import icons from '@/utils/icon';
import { useNavigate } from 'react-router-dom';
import CommonButton from '@/components/UI/CommonButton/CommonButton ';
import { Spinner } from 'react-bootstrap';
import Price from '../Price/Price';
const ListsPrice = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { FaPlusCircle } = icons;
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
    const handleAddPrices = () =>{
        navigate('/addPrices');
    }
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
            <div className={styles.listPrice}>
                <Breadcrumb items={['Quản lý bảng giá', 'Danh sách bảng giá']} activeItem="Danh sách bảng giá" />
            </div>
            <div>
                <div className={styles.listsPriceButton}>
                    <CommonButton onClick={handleAddPrices} icon={FaPlusCircle} label="Thêm" />
                </div>
                {/* <TablePrice data={userData} itemsPerPage={5} /> */}
                <Price data={userData}  itemsPerPage={5}/>
            </div>
        </div>
    );
};

export default ListsPrice;
