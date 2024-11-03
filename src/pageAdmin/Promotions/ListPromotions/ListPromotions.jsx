import TablePromotion from './TablePromotion/TablePromotion';
import React, { useEffect, useState } from 'react';
import styles from './ListPromotions.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import { toast } from 'react-toastify';
import { getPromotionApi } from '@/utils/api';
import CommonButton from '@/components/UI/CommonButton/CommonButton ';
import { useNavigate } from 'react-router-dom';
import icons from '@/utils/icon';
import { Spinner } from 'react-bootstrap';
import TestComponent from '@/pageAdmin/Promotions/ListPromotions/Promotion/Promotion';
const ListsPromotions = () => {
    const navigate = useNavigate();
    const [userData, setPromotionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { FaPlusCircle } = icons;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPromotionApi();
                console.log('dataTable', response);
                setPromotionData(response);
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
        navigate('/addPromotion');
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
            <div className={styles.listsPromotion}>
                <Breadcrumb
                    items={['Quản lý chương trình khuyến mãi', 'Danh sách chương trình khuyến mãi']}
                    activeItem="Danh sách chương trình khuyến mãi"
                />
            </div>
            <div>
                <div className={styles.listsPromotionButton}>
                    <CommonButton onClick={handleAddCustomer} icon={FaPlusCircle} label="Thêm" />
                </div>
                {/* <TablePromotion data={userData} itemsPerPage={5} /> */}
                <TestComponent />
            </div>
        </div>
    );
};

export default ListsPromotions;
