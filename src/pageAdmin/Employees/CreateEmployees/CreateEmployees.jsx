import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import React from 'react';
import styles from "./CreateEmployees.module.css"
const CreateEmployees = () => {
    return (
        <div>
            <div className={styles.createEmployees}>
                <Breadcrumb items={['Quản lý nhân viên', 'Thêm mới']} activeItem="Thêm mới" />
            </div>
        </div>
    );
};

export default CreateEmployees;
