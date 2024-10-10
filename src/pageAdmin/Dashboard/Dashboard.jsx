import React from 'react';

import styles from './Dashboard.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import TotalCalender from '@/components/UI/Dashboard/TotalCalender/TotalCalender';
import TotalCar from '@/components/UI/Dashboard/TotalCar/TotalCar';
import TotalCustomer from '@/components/UI/Dashboard/TotalCustomer/TotalCustomer';
import TotalRevenue from '@/components/UI/Dashboard/TotalRevenue/TotalRevenue';
import TotalUser from '@/components/UI/Dashboard/TotalUser/TotalUser';
import { useNavigate } from 'react-router-dom';


const Dashboard = ({ toggle }) => {
    const navigate = useNavigate();
    const handleItemClick = (type, id) => {
        navigate(`/${type}/${id}`);
    };
    return (
        <div>
            <div className={styles.dashboardWrapper}>
                <div className={toggle ? styles.dashContentWithSidebar : styles.dashContentFull}>
                    <div className={styles.dashBoard}>
                        <Breadcrumb items={['Tổng quan']} />
                    </div>
                    <div className={styles.dashBoardHead}>
                        <TotalCalender onClick={() => handleItemClick('calendar', 1)}/>
                        <TotalCar />
                        <TotalCustomer />
                        <TotalRevenue />
                        <TotalUser />
                    </div>
                
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
