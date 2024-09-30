import React from 'react';
import styles from './TotalCustomer.module.css';
const TotalCustomer = () => {
    return (
        <div className={styles.dashBoardTotalCustomer}>
            <div>
                <div>
                    <span>TotalCustomer</span>
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

export default TotalCustomer;
