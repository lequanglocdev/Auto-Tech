import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import React from 'react';
import styles from './CreateRank.module.css'
const CreateRank = () => {
    return (
        <div>
            <div className={styles.createRank}>
                <Breadcrumb items={['Quản lý hạng khách hàng', 'Thêm mới hạng khách hàng']} activeItem="Thêm mới hạng khách hàng" />
            </div>
        </div>
    );
};

export default CreateRank;
