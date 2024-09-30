import React from 'react';
import styles from './TotalRevenue.module.css';
const TotalRevenue = () => {
    return (
        <div className={styles.dashBoardTotalRevenue}>
            <div>
                <div>
                    <span>TotalRevenue</span>
                    <span>277</span>
                </div>
                <div>
                    <span>last month</span>
                    <span>icon</span>
                </div>
            </div>
        </div>
    );
};

export default TotalRevenue;
