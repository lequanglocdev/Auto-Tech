import SidebarAdmin from '@/components/Layout/AdminLayout/SideBarAdmin/SidebarAdmin';
import React from 'react';

import styles from './Dashboard.module.css';
const Dashboard = ({ toggle }) => {
    return (
        <div>
            <div className={styles.dashboardWrapper}>
                {toggle && <SidebarAdmin />}
                <div className={toggle ? styles.dashContentWithSidebar : styles.dashContentFull}>
                    <h1>Dashboard Content</h1>
                    aldanda
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
