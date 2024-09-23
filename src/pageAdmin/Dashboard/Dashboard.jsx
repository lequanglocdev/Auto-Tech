import React from 'react';

import styles from './Dashboard.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';

const Dashboard = ({ toggle }) => {
    return (
        <div>
            <div className={styles.dashboardWrapper}>
                <div className={toggle ? styles.dashContentWithSidebar : styles.dashContentFull}>
                    {/* Nội dung breakdrum */}
                    <Breadcrumb items={['Tổng quan']} /> 
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
