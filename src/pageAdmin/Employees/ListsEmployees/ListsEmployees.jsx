import React, { useEffect, useState } from 'react';
import styles from './ListsEmployees.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import TableEmployees from './TableEmployees/TableEmployees';
import { geEmployeesApi } from '@/utils/api';
import { toast } from 'react-toastify';
import icons from '@/utils/icon';
import { useNavigate } from 'react-router-dom';
import CommonButton from '@/components/UI/CommonButton/CommonButton ';
import { Spinner } from 'react-bootstrap';

const ListsEmployees = () => {
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { FaPlusCircle } = icons;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await geEmployeesApi();
                setEmployeeData(response);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error('Token đã hết hạn, vui lòng đăng nhập lại.');
                } else {
                    toast.error('Đã xảy ra lỗi khi lấy dữ liệu người dùng.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddEmploy = () => {
        navigate('/addEmployy');
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
            <div className={styles.listsEmployees}>
                <Breadcrumb items={['Quản lý nhân viên', 'Danh sách nhân viên']} activeItem="Danh sách nhân viên" />
            </div>
            <div className={styles.listsEmployeesBody}>
                <div className={styles.listsEmployeesButton}>
                    <CommonButton onClick={handleAddEmploy} icon={FaPlusCircle} label="Thêm" />
                </div>
                <TableEmployees data={employeeData} itemsPerPage={5} />
            </div>
        </div>
    );
};

export default ListsEmployees;
