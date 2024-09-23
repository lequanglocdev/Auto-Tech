import React from 'react';
import styles from './Reports.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';

const Reports = () => {
    return (
        <div>
            {/* Nội dung breakdrum */}
            <Breadcrumb items={['Tổng quan', 'Sales',]} /> 
            {/* Nội dung chính của trang */}
            <div className={styles.reportContent}>
                <p>Đây là thông tin về báo cáo doanh thu từ mục Sales</p>
            </div>
        </div>
    );
};

export default Reports;
