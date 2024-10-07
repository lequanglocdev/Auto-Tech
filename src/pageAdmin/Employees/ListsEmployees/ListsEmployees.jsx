import React, { useEffect } from 'react';
import styles from './ListsEmployees.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import TableEmployees from './TableEmployees/TableEmployees';
import { useState } from 'react';
import {  geEmployeesApi } from '@/utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ListsEmployees = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await  geEmployeesApi();
                console.log('dataTable', response);
                setEmployeeData(response);
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
            <div className={styles.listsEmployees}>
                <Breadcrumb items={['Quản lý nhân viên', 'danh sách nhân viên']} activeItem="danh sách nhân viên" />
            </div>
            <div>
                <TableEmployees data={employeeData} itemsPerPage={5} />
            </div>
            <ToastContainer/>
        </div>
    );
};

export default ListsEmployees;
