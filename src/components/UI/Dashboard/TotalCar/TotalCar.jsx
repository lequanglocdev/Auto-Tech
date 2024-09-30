import React from 'react';
import styles from './TotalCar.module.css'
const TotalCar = () => {
    return (
        <div className={styles.dashBoardTotalCar}>
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

export default TotalCar;
