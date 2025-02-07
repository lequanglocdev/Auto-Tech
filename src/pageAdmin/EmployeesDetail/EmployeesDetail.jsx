import { getDetailEmployee } from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styles from './EmployeeDetail.module.css'

const EmployeesDetail = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await getDetailEmployee({ _id: id });
                if (response) {
                    setEmployee(response);
                } else {
                    setError('Không tìm thấy dữ liệu Nhân viên');
                }
            } catch (error) {
                console.error('Error fetching employee details:', error);
                setError('Lỗi khi lấy chi tiết khách hàng.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);
    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return <div className="text-danger text-center mt-5">{error}</div>;
    }

    if (!employee) {
        return <div className="text-center mt-5">Không có dữ liệu khách hàng.</div>;
    }

    return (
        <div className={`${styles.employeeDetailWrapper} container mt-4`} >
            <div
                className={styles.employeeDetaiProfile}
               
            >
                <h2 className={`mb-3 ${styles.employeeDetailTextHeading}`}>Thông tin chi tiết nhân viên</h2>
                <p className={styles.employeeDetailTextDes}>
                    <strong>Tên:</strong> {employee.name}
                </p>
                <p className={styles.employeeDetailTextDes}>
                    <strong>Email:</strong> {employee.email}
                </p>
                <p className={styles.employeeDetailTextDes}>
                    <strong>Số điện thoại:</strong> {employee.phone_number}
                </p>
                <p className={styles.employeeDetailTextDes}>
                    <strong>Chức vụ:</strong> {employee.role === "manager" ? "Quản lý": ""}
                </p>
               
            </div>
        </div>
    );
};

export default EmployeesDetail;
