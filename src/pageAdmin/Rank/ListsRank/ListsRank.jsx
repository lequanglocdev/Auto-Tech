import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import React, { useEffect, useState } from 'react';
import styles from './ListsRank.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRankApi } from '@/utils/api';
import TableRank from './TableRank/TableRank';
import CommonButton from '@/components/UI/CommonButton/CommonButton ';
import { useNavigate } from 'react-router-dom';
import icons from '@/utils/icon';
import { Spinner } from 'react-bootstrap';
const ListsRank = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { FaPlusCircle } = icons;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRankApi();
                console.log('>> check rank', response);
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

    const handleAddRank = () => {
        navigate('/addRank');
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
            <div className={styles.listRank}>
                <Breadcrumb
                    items={['Quản lý hạng khách hàng', 'Danh sách hạng khách hàng']}
                    activeItem="Danh sách hạng khách hàng"
                />
            </div>
            <div>
                <div className={styles.listsRankButton}>
                    <CommonButton onClick={handleAddRank} icon={FaPlusCircle} label="Thêm" />
                </div>
                <TableRank data={userData} itemsPerPage={5} />
            </div>
            <ToastContainer />
        </div>
    );
};

export default ListsRank;
